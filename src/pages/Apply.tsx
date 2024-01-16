import ApplyInfo from '@/components/apply';
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation';
import usePollApplyStatus from '@/components/apply/hooks/usePollApplyStatus';
import useUser from '@/hooks/auth/useUser';
import { APPLY_STATUS } from '@/models/apply';
import { updateApplyCard } from '@/remote/apply';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Apply() {
  const navigate = useNavigate();

  const [readyToPoll, setReadyToPoll] = useState(false);

  const user = useUser();
  const { id } = useParams() as { id: string };

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      });
      console.log('성공');

      navigate('/apply/done?success=true', {
        replace: true,
      });
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      });
      console.log('실패');

      navigate('/apply/done?success=false', {
        replace: true,
      });
    },
    enadbled: readyToPoll,
  });

  const { mutate, isPending: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true);
    },
    onError: () => {
      window.history.back();
    },
  });

  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading...</div>;
  }

  return <ApplyInfo onSubmit={mutate} />;
}

export default Apply;
