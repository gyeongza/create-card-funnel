import { css } from '@emotion/react';
import FixedBottomButton from '../common/FixedBottomButton';
import Flex from '../common/Flex';
import TextFeild from '../common/TextLabel';
import Spacing from '../common/Spacing';

function Form() {
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFeild label="이메일" placeholder="example@example.com" />
      <Spacing size={16} />
      <TextFeild label="비밀번호" type="password" />
      <Spacing size={16} />
      <TextFeild label="비밀번호 재확인" type="password" />
      <Spacing size={16} />
      <TextFeild label="이름" placeholder="박경현" />

      <FixedBottomButton disabled={true} label="회원가입" onClick={() => {}} />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

export default Form;
