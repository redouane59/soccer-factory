import { LevelsEnum } from '../Player/LevelsEnum.js';

export class RatingConvertHelper {
  static getGenFromNbStars(nbStars) {
    return 45+10*nbStars;
  }

  static getNbStarsFromGen(gen){
    return (gen-45)/10;
  }

  static getNbMaxStarsFromLevel(level, nbCriteria){
    var value = 0;
    if(level===LevelsEnum.NOVICE){
      value = 1.5;
    } else if(level===LevelsEnum.DEBUTANT){
      value = 2;
    } else if(level===LevelsEnum.INTERMEDIAIRE){
      value = 2.5;
    } else if(level===LevelsEnum.AVANCE){
      value = 3;
    } else if(level===LevelsEnum.PROFESSIONNEL){
      value = 3.5;
    }
    return nbCriteria*value;
  }

    static getGenFromLevel(level){
      var value = 0;
      if(level===LevelsEnum.NOVICE){
        value = 60;
      } else if(level===LevelsEnum.DEBUTANT){
        value = 65;
      } else if(level===LevelsEnum.INTERMEDIAIRE){
        value = 70;
      } else if(level===LevelsEnum.AVANCE){
        value = 75;
      } else if(level===LevelsEnum.PROFESSIONNEL){
        value = 80;
      }
      return value;
  }

}
