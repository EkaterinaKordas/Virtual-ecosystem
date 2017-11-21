"use strict";

/**
 * Entity - wall
 */

class Wall {
  constructor() {
    this.code = ENTITY_CODE.WALL;
  }
}

/**
 * Entity - herb
 */

class Herb {
  constructor() {
    this.code = ENTITY_CODE.HERB;
    this.curEnergy = 2;
  }
}

/**
 * Entity - living entity
 */

class LivingEntity {
  constructor(x, y){
    this.coords = [x, y];
  };

  eat(victimEnergy){
    this.curEnergy += victimEnergy;
  }

  multiply(curCoords, newCoords){
    if(this.curEnergy >= this.maxEnergy){
      this.curEnergy /= 2;

      Ecosystem.createChild(curCoords, newCoords);
    }
  }

  die(){
    if(this.curEnergy <= 0){
      Ecosystem.removeEntity(this.coords);
      this.coords = null;
    }
  }

  takeTheStep(newCoords, whatIsNextCell){
    if(!whatIsNextCell){
      this.coords = newCoords;
    }

    this.curEnergy--;
  }
}

/**
 * Entity - herbivore (child)
 * living entity - parent
 */

class Herbivore extends LivingEntity {
  constructor(x, y) {
    super(x, y);
    this.code = ENTITY_CODE.HERBIVORE;

    this.maxEnergy = 8;
    this.curEnergy = 4;
  }

  //TODO: rename whatIsInNextCell
  takeTheStep(newCoords, whatIsInNextCell, multiplyHerb){
    if(whatIsInNextCell && whatIsInNextCell.code === ENTITY_CODE.HERB){
      this.eat(whatIsInNextCell.curEnergy);
      this.coords = newCoords;

      Ecosystem.multiplyHerb();
    }

    super.takeTheStep(newCoords, whatIsInNextCell);
  }
}

/**
 * Entity - carnivore (child)
 * living entity - parent
 */

class Carnivore extends LivingEntity {
  constructor(x, y){
    super(x, y);
    this.code = ENTITY_CODE.CARNIVORE;

    this.maxEnergy = 10;
    this.curEnergy = 5;
  }

  //TODO: rename whatIsInNextCell
  takeTheStep(newCoords, whatIsInNextCell){
    if (whatIsInNextCell && whatIsInNextCell.code === ENTITY_CODE.HERBIVORE){
      this.eat(whatIsInNextCell.curEnergy);
      this.coords = newCoords;
    }

    super.takeTheStep(newCoords, whatIsInNextCell);
  }
}


