import { PreferredFootEnum } from './PreferredFootEnum.js';
import { LevelsEnum } from './LevelsEnum.js';
import { CriterionModel } from './CriterionModel.js';
import { PlayerModel } from './PlayerModel.js';

export class MockPlayers{


  static getPlayerSample(){
    var playerList = [];
    var p1 = new PlayerModel(
      "Redouane B.",
      LevelsEnum.INTERMEDIAIRE,
      [new CriterionModel("TIR",60),
      new CriterionModel("PAS",70),
      new CriterionModel("DRI",70),
      new CriterionModel("DEF",75),
      new CriterionModel("PHY",70),
      new CriterionModel("VIT",70)],
      PreferredFootEnum.RIGHT,
      "1991-04-19",
      "redouane.bali@decathlon.com",
      1);

      var p2 = new PlayerModel(
        "Joachim B.",
        LevelsEnum.PROFESSIONNEL,
        [new CriterionModel("TIR",90),
        new CriterionModel("PAS",80),
        new CriterionModel("DRI",90),
        new CriterionModel("DEF",70),
        new CriterionModel("PHY",65),
        new CriterionModel("VIT",95)],
        PreferredFootEnum.RIGHT,
        "1985-01-01",
        "joachim.bensalah@decathlon.com",
        2);

        var p3 = new PlayerModel(
          "Nabil E.",
          LevelsEnum.PROFESSIONNEL,
          [new CriterionModel("TIR",90),
          new CriterionModel("PAS",70),
          new CriterionModel("DRI",75),
          new CriterionModel("DEF",65),
          new CriterionModel("PHY",95),
          new CriterionModel("VIT",90)],
          PreferredFootEnum.RIGHT,
          "1991-05-05",
          "nabil.elmidaoui@decathlon.com",
          3);

          var p4 = new PlayerModel(
            "Kocella M.",
            LevelsEnum.AVANCE,
            [new CriterionModel("TIR",70),
            new CriterionModel("PAS",75),
            new CriterionModel("DRI",65),
            new CriterionModel("DEF",90),
            new CriterionModel("PHY",95),
            new CriterionModel("VIT",70)],
            PreferredFootEnum.RIGHT,
            "1988-03-22",
            "kocella.mechouek@decathlon.com",
            4);

            var p5 = new PlayerModel(
              "Bertrand P.",
              LevelsEnum.AVANCE,
              [new CriterionModel("TIR",75),
              new CriterionModel("PAS",65),
              new CriterionModel("DRI",80),
              new CriterionModel("DEF",70),
              new CriterionModel("PHY",80),
              new CriterionModel("VIT",75)],
              PreferredFootEnum.LEFT,
              "1982-12-14",
              "bertrand.potart@decathlon.com",
              5);

              var p6 = new PlayerModel(
                "José B.",
                LevelsEnum.NOVICE,
                [new CriterionModel("TIR",60),
                new CriterionModel("PAS",60),
                new CriterionModel("DRI",60),
                new CriterionModel("DEF",65),
                new CriterionModel("PHY",65),
                new CriterionModel("VIT",55)],
                PreferredFootEnum.LEFT,
                "1974-11-04",
                "josé.berlemont.com",
                6);
                playerList.push(p1);
                playerList.push(p2);
                playerList.push(p3);
                playerList.push(p4);
                playerList.push(p5);
                playerList.push(p6);

                console.log(playerList);
                return playerList;
              }
            }
