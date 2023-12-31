export function useRouteQueryWatcher(action:any) {
  const route = useRoute()
  const router = useRouter()
  const debouncedAction = _debounce(action, 10)

  watch(
    () => route.query,
    (query, oldQuery) => {
      if (oldQuery?.page && query?.page === oldQuery?.page && query?.page !== '1') {
        router.replace({query: {...query, page: '1'}})
      } else if (!_isEmpty(query)) {
        debouncedAction()
      }
    },
    {deep: true},
  )
}

export const setQueryParam = (queryString: any, value = null) => {
  const route = useRoute()
  const router = useRouter()
  if (typeof queryString === 'string' || queryString instanceof String) {
    // @ts-ignore
    queryString = {[queryString]: value}
  }
  const alreadyHasSameQueries = _isMatch(route.query, queryString)

  if (alreadyHasSameQueries || !router) {
    return
  }

  router.replace({query: {...route.query, ...queryString}})
}

export const getQueryParam = (queryStringKey: any, defaultValue = null) => {
  const route = useRoute()
  let currentQueries = []
  currentQueries = route.query
  return currentQueries[queryStringKey] || defaultValue
}