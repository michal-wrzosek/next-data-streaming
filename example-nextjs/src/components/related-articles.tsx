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

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Paragraph = styled.p`
  font-size: 16px;
`;

const Item = styled.div<{ $isLoading?: boolean }>`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: lightgray;
  padding: 16px;

  ${({ $isLoading }) =>
    $isLoading
      ? css`
          animation: ${pulseAnimation} 2s infinite;
        `
      : ''};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export interface RelatedArticle {
  title: string;
  content: string;
  href: string;
}

export interface RelatedArticlesProps {
  relatedArticles?: RelatedArticle[];
}

export const RelatedArticles = ({ relatedArticles }: RelatedArticlesProps) => (
  <Wrapper>
    {relatedArticles
      ? relatedArticles.map(({ title, content, href }, index) => (
          <Link key={index} href={href}>
            <Item>
              <Title>{title}</Title>
              <Paragraph>{content}</Paragraph>
            </Item>
          </Link>
        ))
      : new Array(3).fill(null).map((_, index) => <Item key={index} $isLoading />)}
  </Wrapper>
);
