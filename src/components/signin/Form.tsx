import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Flex from '../common/Flex';
import TextFeild from '../common/TextLabel';
import Spacing from '../common/Spacing';
import Button from '../common/Button';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import Text from '../common/Text';
import { colors } from '@/styles/colorPalette';
import { FormValues } from '@/models/signin';
import validator from 'validator';

interface FormProps {
  onSubmit: (formValues: FormValues) => void;
}

function Form({ onSubmit }: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const 제출가능한가 = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextFeild
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextFeild
        label="비밀번호"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        disabled={제출가능한가 === false}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`;

function validate(formValues: FormValues) {
  // eslint-disable-next-line prefer-const
  let errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8글자 이상 입력해주세요';
  }

  return errors;
}

export default Form;
