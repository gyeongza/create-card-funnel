import { APPLY_STATUS } from '@/models/apply';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface usePollApplyStatusProps {
  onSuccess: () => void;
  onError: () => void;
  enadbled: boolean;
}

function usePollApplyStatus({
  onSuccess,
  onError,
  enadbled,
}: usePollApplyStatusProps) {
  const queryResult = useQuery({
    queryKey: ['applyStatus'],
    queryFn: () => getApplyStatus(),
    refetchInterval: 2_000,
    enabled: enadbled,
  });

  useEffect(() => {
    if (queryResult.error) {
      onError();
    } else {
      onSuccess();
    }
  }, [queryResult.error, onError, onSuccess]);

  return { ...queryResult };
}

function getApplyStatus() {
  const values = [
    APPLY_STATUS.READY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ];

  const status = values[Math.floor(Math.random() * values.length)];

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.');
  }

  return status;
}

export default usePollApplyStatus;
