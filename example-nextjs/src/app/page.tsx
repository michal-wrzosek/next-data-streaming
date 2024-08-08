import { NextDataStreaming } from '../react-component-lib';
import { NavigationItem, User } from '@/components/navigation';
import { Client } from './client';
import { RelatedArticle } from '@/components/related-articles';
import { Article } from '@/components/article';

export default function Page() {
  return (
    <NextDataStreaming
      data={{
        article: article,
      }}
      dataStream={{
        navigation: new Promise<NavigationItem[]>((resolve) => setTimeout(() => resolve(navigation), 2000)),
        user: new Promise<User>((resolve) => setTimeout(() => resolve(user), 3000)),
        relatedArticles: new Promise<RelatedArticle[]>((resolve) => setTimeout(() => resolve(relatedArticles), 4000)),
      }}
      ClientComponent={Client}
    />
  );
}

const article: Article = {
  title: 'Next.js progressive partial data streaming library example',
  content: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet dignissim erat, vel lobortis tortor rutrum varius. Duis dignissim dapibus odio sit amet aliquet. Sed tincidunt eu magna vel lacinia. Donec sollicitudin, orci in fringilla ullamcorper, nulla diam condimentum orci, non molestie eros nisl vitae leo. Nam pretium tempor mi. Donec sit amet pharetra odio. Duis rhoncus bibendum molestie. Nam non dolor lacinia, sagittis ante non, auctor arcu.',

    'Donec cursus magna ut felis fermentum, non volutpat nunc pulvinar. Duis aliquet accumsan enim, nec porttitor mi suscipit a. Proin blandit at mauris ut mollis. Praesent enim mi, efficitur sit amet velit eget, porta faucibus eros. Mauris ut faucibus ligula, ac aliquet urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin accumsan dapibus turpis, sed sodales orci consectetur vitae. Praesent malesuada elit et molestie dapibus. Curabitur faucibus nunc eleifend justo ullamcorper luctus. Donec mi risus, suscipit nec quam ut, ornare blandit erat. Vivamus turpis quam, pretium non urna et, porta molestie erat. Phasellus pellentesque non felis in tincidunt. Integer consectetur posuere fermentum. Nullam ultricies mollis metus.',

    'Integer luctus tincidunt ex non vestibulum. Duis sed commodo eros. Vestibulum porta volutpat cursus. Phasellus nec neque vel sapien fermentum scelerisque ut at enim. Fusce et imperdiet risus. Sed consequat, lacus quis molestie iaculis, justo purus sodales quam, viverra mattis ex velit at eros. Aliquam sed lobortis magna, quis rutrum elit. Vestibulum convallis rhoncus lorem quis lobortis. Vestibulum sit amet dignissim tellus, dapibus tempus erat. Suspendisse id enim varius magna finibus vulputate nec non nisi. Morbi iaculis posuere turpis, quis tempus ex lobortis nec. Aliquam viverra justo non nisi interdum, sit amet iaculis nulla finibus. Praesent sit amet ante ante. Sed molestie nulla eget arcu consequat, nec iaculis turpis lacinia. Morbi ornare ornare arcu, vitae feugiat sem luctus pharetra. Integer ligula lacus, convallis vitae nulla eget, bibendum lobortis sapien.',

    'Nullam quis mauris vel sapien tempor bibendum nec in est. Praesent dignissim varius massa ut venenatis. Morbi maximus gravida mauris, et viverra sapien fringilla at. Cras sed elementum odio. Aliquam vel mi eu mauris rutrum dignissim. Donec facilisis ex eu ante pretium congue at non magna. Nullam id enim id enim rutrum vulputate. Integer ullamcorper vel purus vitae convallis. Sed ac neque turpis. Phasellus ut elementum magna. In eu nunc bibendum, eleifend lacus vel, congue eros. Aenean at nunc urna. Duis non sem sed risus imperdiet imperdiet a ac est. Mauris volutpat arcu at feugiat vehicula. Ut posuere ultricies libero, at volutpat diam feugiat ut. Sed et iaculis diam, at pellentesque massa.',
  ],
};

const navigation: NavigationItem[] = [
  { href: '/', label: 'Homepage' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const user: User = { name: 'John Doe', email: 'john@doe.com' };

const relatedArticles: RelatedArticle[] = [
  {
    title: 'Related article 1',
    content: 'This is a related article 1',
    href: '/related-article-1',
  },
  {
    title: 'Related article 2',
    content: 'This is a related article 2',
    href: '/related-article-2',
  },
  {
    title: 'Related article 3',
    content: 'This is a related article 3',
    href: '/related-article-3',
  },
];
