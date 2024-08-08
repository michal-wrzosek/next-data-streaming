'use client';

// import { ClientComponentProps } from '@/react-component-lib';
import { ClientComponentProps } from 'next-data-streaming';
import styled from 'styled-components';
import { Article } from '@/components/article';
import { Navigation, NavigationItem, User } from '@/components/navigation';
import { RelatedArticle, RelatedArticles } from '@/components/related-articles';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
`;

type ClientProps = ClientComponentProps<
  {
    article: Article;
  },
  {
    navigation: NavigationItem[];
    user: User;
    relatedArticles: RelatedArticle[];
  }
>;

export const Client = ({ data: { article }, dataStream: { navigation, user, relatedArticles } }: ClientProps) => {
  return (
    <Main>
      <Navigation navigation={navigation} user={user} />
      <Article article={article} />
      <RelatedArticles relatedArticles={relatedArticles} />
    </Main>
  );
};
