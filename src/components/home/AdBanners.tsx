import { css } from '@emotion/react';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { colors } from '@/styles/colorPalette';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAdBanners } from '@/remote/adBanner';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

function AdBanners() {
  const { data } = useQuery({
    queryKey: ['adBanners'],
    queryFn: () => getAdBanners(),
  });

  return (
    <Contianer>
      <Swiper spaceBetween={8}>
        {data?.map((adBanner) => {
          return (
            <SwiperSlide key={adBanner.id}>
              <Link to={`/ad-banners/${adBanner.id}`} key={adBanner.id}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>{adBanner.title}</Text>
                  <Text typography="t7">{adBanner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Contianer>
  );
}

const Contianer = styled.div`
  padding: 24px;
`;

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`;

export default AdBanners;
