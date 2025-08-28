let position = 0;
class Barre  {
  constructor(radius, height, z1, z2, z3, z4, z5) {
    this.radius = radius;
    this.height = height;

    this.z1 = z1;
    this.z2 = z2;
    this.z3 = z3;
    this.z4 = z4;
    this.z5 = z5;
  }
  BarreSlider(){
    sliders[0].value(barre.z1);
    sliders[5].value(barre.z1);
    sliders[1].value(barre.z2);
    sliders[6].value(barre.z2);
    sliders[2].value(barre.z3);
    sliders[7].value(barre.z3);
    sliders[3].value(barre.z4);
    sliders[8].value(barre.z4);
    sliders[4].value(barre.z5);
    sliders[9].value(barre.z5);
  }
 Neutre(){
   if(barre.z1 == 127){
       position = 1;
     }
   if(barre.z1 == -127){
       position = 0;
       }
   if(position == 1){
     barre.z1--;
     barre.z2--;
     barre.z3--;
     barre.z4--;
     barre.z5--;
   }else {
     barre.z1++;
     barre.z2++;
     barre.z3++;
     barre.z4++;
     barre.z5++;
   }
  }
  Sinus1(){
    if(barre.z2 < 25){
      if (barre.z1<50) {
        barre.z1++;
      }
    }
    if(barre.z1 > 25){
      if (barre.z2<50) {
        barre.z2++;
      }
    }
    if(barre.z2 > 25){
      if (barre.z3<50) {
        barre.z3++;
      }
    }
    if(barre.z3 > 25){
      if (barre.z4<50) {
        barre.z4++;
      }
    }
    if(barre.z4 > 25){
      if (barre.z5<50) {
        barre.z5++;
      }
    }
    if(barre.z2 > 25){
      if (barre.z1>0) {
        barre.z1--;
      }
    }
    if(barre.z1 < 25){
      if (barre.z2>0) {
        barre.z2--;
      }
    }
    if(barre.z2< 25){
      if (barre.z3>0) {
        barre.z3--;
      }
    }
    if(barre.z3< 25){
      if (barre.z4>0) {
        barre.z4--;
      }
    }
    if(barre.z4< 25){
      if (barre.z5>0) {
        barre.z5--;
      }
    }
  }
    Sinus2(){
      if(barre.z1 == 40){
          position = 1;
        }
      if(barre.z1 == -40){
          position = 0;
          }

      if(position == 0){
        barre.z1++
        barre.z2++;
        barre.z4--;
        barre.z5--;
      }else {
        barre.z1--;
        barre.z2--;
        barre.z4++;
        barre.z5++;
      }
    }
    SlidersBarre(){
      barre.z1 = sliders[0].value();
      barre.z2 = sliders[1].value();
      barre.z3 = sliders[2].value();
      barre.z4 = sliders[3].value();
      barre.z5 = sliders[4].value();
    }
    reset(){
      barre.z1 = 0;
      barre.z2 = 0;
      barre.z3 = 0;
      barre.z4 = 0;
      barre.z5 = 0;
    }

    canvas(){
      canvas2.push();
      canvas2.noStroke();
      canvas2.fill(200, 150, 100);
      canvas2.angleMode(DEGREES);
      canvas2.rotateX(60);
      canvas2.push();
      canvas2.translate(-50, 0, barre.z1);
      canvas2.cylinder(barre.radius, barre.height);
      canvas2.pop();
      canvas2.push();
      canvas2.translate(-10, 0, barre.z2);
      canvas2.cylinder(barre.radius, barre.height);
      canvas2.pop();
      canvas2.push();
      canvas2.translate(30, 0, barre.z3);
      canvas2.cylinder(barre.radius, barre.height);
      canvas2.pop();
      canvas2.push();
      canvas2.translate(70, 0, barre.z4);
      canvas2.cylinder(barre.radius, barre.height);
      canvas2.pop();
      canvas2.push();
      canvas2.translate(110, 0, barre.z5);
      canvas2.cylinder(barre.radius, barre.height);
      canvas2.pop();
      image(canvas2, windowWidth/2, 3);
      canvas2.pop();
    }
    loop(){
      if(neutre == 1 && auto == 0){
        if(sinus2 == 2){
          barre.reset();
          sinus2 = 0;
        }
        if(sinus1 == 2){
          barre.reset();
          sinus1 = 0;
        }
        barre.Neutre();
        barre.BarreSlider();
        for (let i = 0;i<nMoteurs;i++){
        sendMessage("vmot"+nf(i,3,0)+"="+sliders[i].value());
      }
      }

      if(sinus1 == 1 && auto == 0){
        if(neutre == 2){
          barre.reset();
          neutre = 0;
        }
        if(sinus2 == 2){
          barre.reset();
          sinus2 = 0;
        }
        barre.Sinus1();
        barre.BarreSlider();
        for (let i = 0;i<nMoteurs;i++){
        sendMessage("vmot"+nf(i,3,0)+"="+sliders[i].value());
      }
      }

      if(sinus2 == 1 && auto == 0){
        if(neutre == 2){
          barre.reset();
          neutre = 0;
        }
        if(sinus1 == 2){
          barre.reset();
          sinus1 = 0;
        }
        barre.Sinus2();
        barre.BarreSlider();
        for (let i = 0;i<nMoteurs;i++){
        sendMessage("vmot"+nf(i,3,0)+"="+sliders[i].value());
      }
      }
    }
  }
