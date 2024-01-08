import { auth } from '@/remote/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const [initialize, setInitialize] = useState(false);

  // 유저에 대한 인증 정보가 변경되변 콜백함수를 실행한다.
  onAuthStateChanged(auth, (user) => {
    console.log(user);

    setInitialize(true);
  });

  if (initialize === false) {
    return <div>인증 처리중</div>;
  }

  return <>{children}</>;
}

export default AuthGuard;
