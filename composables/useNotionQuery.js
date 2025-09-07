import { ref } from 'vue'
import { Client } from '@notionhq/client'

export function useNotionQuery() {
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const notion = new Client({
    auth: useRuntimeConfig().public.notionToken
  })
  
  const databaseId = useRuntimeConfig().public.notionDatabaseId
  
  const formatDateForNotion = (calendarDate) => {
    if (!calendarDate) return null
    return calendarDate.toString()
  }
  
  const buildDateFilter = (startDate, endDate = null) => {
    if (!startDate) return null
    
    const startDateStr = formatDateForNotion(startDate)
    
    if (endDate) {
      const endDateStr = formatDateForNotion(endDate)
      return {
        and: [
          {
            property: 'startDate',
            date: {
              on_or_after: startDateStr
            }
          },
          {
            property: 'startDate',
            date: {
              on_or_before: endDateStr
            }
          }
        ]
      }
    }
    
    return {
      property: 'startDate',
      date: {
        on_or_after: startDateStr
      }
    }
  }
  
  const queryDatabase = async (dateRange) => {
    if (!databaseId) {
      error.value = 'Notion database ID not configured'
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const startDate = dateRange?.[0]?.start
      const endDate = dateRange?.[0]?.end
      
      const filter = buildDateFilter(startDate, endDate)
      
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: filter,
        sorts: [
          {
            property: 'startDate',
            direction: 'ascending'
          }
        ]
      })
      
      results.value = response.results
    } catch (err) {
      error.value = err.message || 'Failed to query Notion database'
      console.error('Notion API Error:', err)
    } finally {
      loading.value = false
    }
  }
  
  return {
    results,
    loading,
    error,
    queryDatabase
  }
}
