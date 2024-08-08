import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

const pulseAnimation = keyframes`
    0% {
        background-color: lightgray;
    }
    50% {
        background-color: gray;
    }
    100% {
        background-color: lightgray;
    }
    `;

const Item = styled.div<{ $isLoading?: boolean }>`
  width: 140px;
  height: 60px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $isLoading }) =>
    $isLoading
      ? css`
          animation: ${pulseAnimation} 2s infinite;
        `
      : ''};
`;

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;

  ${Item}:last-child {
    margin-left: auto;
  }
`;

export interface NavigationItem {
  href: string;
  label: string;
}

export interface User {
  name: string;
  email: string;
}

export interface NavigationProps {
  navigation?: NavigationItem[];
  user?: User;
}

export const Navigation = ({ navigation, user }: NavigationProps) => {
  return (
    <Wrapper>
      {navigation
        ? navigation.map(({ href, label }) => (
            <Link key={label} href={href}>
              <Item>{label}</Item>
            </Link>
          ))
        : new Array(3).fill(null).map((_, i) => <Item key={i} $isLoading />)}

      {user ? <Item>Hi {user.name}!</Item> : <Item $isLoading />}
    </Wrapper>
  );
};
