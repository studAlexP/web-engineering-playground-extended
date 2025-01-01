import BearTable from './BearTable.tsx';
import WildBearImage from '../assets/images/wild-bear.jpg';
import UrbanBearImage from '../assets/images/urban-bear.jpg';
import Comment from './Comment.tsx';
import AuthorInfo from './AuthorInfo.tsx';
import BearMating from './BearMating.tsx';
import BearList from './BearList.tsx';
import type { Bear } from '../types/bear.ts';

const bearData: Bear[] = [
  {
    type: 'Wild',
    coat: 'Brown or black',
    size: '1.4 to 2.8 meters',
    habitat: 'Woods and forests',
    lifespan: '25 to 28 years',
    diet: 'Fish, meat, plants',
  },
  {
    type: 'Urban',
    coat: 'North Face',
    size: '18 to 22',
    habitat: 'Condos and coffee shops',
    lifespan: '20 to 32 years',
    diet: 'Starbucks, sushi',
  },
];

function Article(): React.JSX.Element {
  return (
    <article>
      <h2>The trouble with Bears</h2>
      <p>By Evan Wild</p>
      <p>
        Tall, lumbering, angry, dangerous. The real live bears of this world are
        proud, independent creatures, self-serving and always on the hunt for
        food. Nothing like the bears you see on TV, like Ba-loo from renowned
        documentary, The Jungle Book. So what are bears really like, and why
        does the world's media portray them with such a skewed vision? In this
        article we try to answer those questions, and give you a real insight
        into the life of the bear.
      </p>
      <h3>Types of bear</h3>
      <p>
        Bears come in two varieties — large and medium. You don't get small
        bears. If you have seen a small bear, then it was in fact probably a
        baby bear (cub) from another species. Bears can also be classified in
        terms of their habitat — both large and medium bears are just as at home
        in urban areas as they are in the countryside. Different habitats
        encourage different behaviour however, as you'll find out below. The
        below table also gives you some useful facts about bears.
      </p>
      <BearTable bears={bearData} />
      <h3>Habitats and Eating habits</h3>
      <p>
        Wild bears eat a variety of meat, fish, fruit, nuts, and other naturally
        growing ingredients. In general, they will hunt for food themselves in
        woodland or rivers, but at a push they will track down their sustenance
        from farms or country houses. They tend to live in relative isolation,
        in caves, tents, or cottages.
      </p>
      <img src={WildBearImage} alt="Image of a brown bear in the wild" />
      <p>
        Urban (gentrified) bears on the other hand have largely abandoned the
        old ways. They will hunt other urban creatures if necessary (including
        other predators like rats and foxes), but prefer to scavenge from
        readily available urban food outlets like dumpsters, bins, and fast food
        joints. When food has proven scarce, urban bears have even been known to
        break into people's kitchens and steal essentials like baked beans,
        ready meals, and microwave ovens.
      </p>
      <img src={UrbanBearImage} alt="Grey image of an urban bear" />
      <p>
        Urban bears will sleep anywhere they can, from bus shelters and parks,
        to the toilets in McDonald's, to their own apartment.
      </p>
      <BearMating />
      <AuthorInfo />
      <Comment />
      <BearList />
    </article>
  );
}

export default Article;
