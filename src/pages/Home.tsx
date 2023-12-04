import Top from '@/components/common/Top';
import { getAdBanners } from '@/remote/adBanner';
import { getCards } from '@/remote/card';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    getCards().then((response) => {
      console.log(response);
    });

    getAdBanners().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <Top
      title="혜택 좋은 복지카드"
      subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
    ></Top>
  );
}

export default Home;
