import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCard } from '@/remote/card';
import Top from '@/components/common/Top';
import ListRow from '@/components/common/ListRow';
import FixedBottomButton from '@/components/common/FixedBottomButton';
import Flex from '@/components/common/Flex';
import Text from '@/components/common/Text';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import useUser from '@/hooks/auth/useUser';
import { useAlertContext } from '@/contexts/AlertContext';

function Card() {
  const { id = '' } = useParams();
  const user = useUser();
  const { open } = useAlertContext();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
    enabled: id !== '',
  });

  const moveToApply = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/signin');
        },
      });
      return;
    }

    navigate(`/apply/${id}`);
  }, [user, id, open, navigate]);

  if (data === null) {
    return null;
  }

  if (isLoading) {
    return <div>isLoading</div>;
  }

  const {
    corpName = '',
    name = '',
    promotion,
    tags = [],
    benefit = [],
  } = data ?? {};

  const subTitle =
    promotion != null ? removeHtmlTag(promotion.title) : tags.join('');

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle ?? ''} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={text}
              initial={{ opacity: 0, translateX: -90 }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{ opacity: 1, translateX: 0 }}
            >
              <ListRow
                as="div"
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              ></ListRow>
            </motion.li>
          );
        })}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTag(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  );
}

function removeHtmlTag(text: string) {
  let output = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i; j < text.length; j++) {
        if (text[j] === '>') {
          i = j;
          break;
        }
      }
    } else {
      output += text[i];
    }
  }

  return output;
}

export function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      ></path>
    </svg>
  );
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`;

export default Card;
