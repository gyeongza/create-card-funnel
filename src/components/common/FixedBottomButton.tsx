import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import Button from './Button';
import { colors } from '@/styles/colorPalette';
import { createPortal } from 'react-dom';

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
}

function FixedBottomButton({ label, onClick }: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal');

  if ($portalRoot == null) {
    return null;
  }

  return createPortal(
    <Container>
      <Button full={true} onClick={onClick} css={buttonStyles}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  );
}

const slideup = keyframes`
    to{
        transform: translateY(0);
    }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;

  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`;

const buttonStyles = css`
  border-radius: 8px;
`;

export default FixedBottomButton;
