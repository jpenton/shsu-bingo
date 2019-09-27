import { IBingoCell } from '../components/BingoCard';

export type ProfessorName = 'Burris' | 'Cho';
export interface IProfessor {
  centerImage: string;
  isms: (string | IBingoCell)[];
  profileImage: string;
}

const professors: Partial<Record<ProfessorName, IProfessor>> &
  {
    [x in ProfessorName]: IProfessor;
  } = {
  Burris: {
    centerImage: '/static/img/burris_hat.png',
    isms: [
      'Professional Grade!!',
      '"Mickey Mouse Programming"',
      '"Are you/we satisfied??"',
      { countMax: 5, text: '"Deal"', type: 'counter' },
      '"Wrong side of the tracks"',
      '"Road map fee"',
      '"Donald Knuth"',
      '"Garbage Collection"',
      '"The Snake" / "The Squeeze"',
      '"It\'s ethical!!"',
      '"I\'ve got time"',
      '"Let\'s see if we can\'t..."',
      '"Are you kidding me??"',
      '"Back when I worked with NASA..."',
      '"Do your competition a favor!"',
      '"The Hymnal"',
      '*anything about DF majors being untrustworthy*',
      '"Kiss the pavement"',
      '*something about assembly being your favorite language*',
      '*something about Apollo 11 having 2k of storage / 32k memory*',
      '"If you haven\'t started on your lab..."',
      '"If you do the *x* option, you should be able to do the *y* option."',
      '"In Ada..."',
      '"Fruit of the Loom"',
      `"Nevermind"`,
      `"...and so on down the line"`,
      `"Script Kiddies"`,
      `"Kiddie Grade"`,
      `"Please come back. I get lonely when you're not here..."`,
    ],
    profileImage:
      'https://cs.shsu.edu/dotAsset/05835d24-63bd-4a76-a63a-50dccf4144ad.jpg',
  },
  Cho: {
    centerImage: '#',
    isms: [
      { countMax: 3, text: `"COME ON"`, type: 'counter' },
      `"Bad guy"`,
      `*Burris Noises*`,
      `*Something about GOD*`,
      `"This guy"`,
      `"DULL"`,
      `"...that's only part of the story"`,
      `"You are abnormal"`,
      `"...gee"`,
    ],
    profileImage: 'https://cs.shsu.edu/images/2017-faculty/Dr.+Cho.jpg',
  },
};

export default professors;
