import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

export interface Article {
  title: string;
  content: string[];
}

export interface ArticleProps {
  article: Article;
}

export const Article = ({ article: { title, content } }: ArticleProps) => (
  <Wrapper>
    <Title>{title}</Title>
    {content.map((paragraph, index) => (
      <Paragraph key={index}>{paragraph}</Paragraph>
    ))}
  </Wrapper>
);
