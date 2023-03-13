<script>
import { ref } from 'vue';

export const useFetch = (fetchFn) => {
  const loading = ref(false)
  const data = ref(null)
  const error = ref(null)
  const execute = () => {
    loading.value = true
    return fetchFn().then(res => {
      data.value = res
      loading.value = false
      return res
    }).catch(err => {
      error.value = err
    })
  }
  return { loading, data, error, execute }
}

</script>