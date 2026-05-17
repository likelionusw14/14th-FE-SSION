import { useState, useCallback } from 'react'

export function useAsyncFetch() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [lastAction, setLastAction] = useState(null)

  const run = useCallback(async (asyncFn, label) => {
    setStatus('loading')
    setErrorMsg('')
    setLastAction(() => asyncFn)
    try {
      const result = await asyncFn()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
      return result
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || '알 수 없는 오류')
      return null
    }
  }, [])

  const retry = useCallback(async () => {
    if (!lastAction) return null
    return run(lastAction, 'retry')
  }, [lastAction, run])

  const statusText =
    status === 'idle' ? '준비 완료' :
    status === 'loading' ? '불러오는 중...' :
    status === 'success' ? '완료!' :
    `불러오기 실패: ${errorMsg}`

  return { run, retry, status, statusText, isLoading: status === 'loading' }
}
