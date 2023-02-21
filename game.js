const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "You are walking through a dark forest, when you hear a faint whisling of the wind flowing through the winding branches. Less than a minute later, it picks up, and you hold onto the nearest tree to avaoid flying away. Luckily, you found the dungeon entrance you have been looking for. You see the old mossy bricks stacked into the side of the hill, and you let out a sigh of relief. Running from one tree trunk to another, you finally get out of the wind's path. Before you can open the wooden door, a deafening cracking sound comes from behind you. A tree, hundreds of feet high, collapsed and fell where you were standing only seconds ago. Rushing to open the door, you have to wait for your eyes to adjust. The room you are in is small, and lit by flickering candles. You see a sword and a shield in one corner of the room, and a quiver of arrows next to a bow on the other side of the room.",
    options: [
      {
        text: "become a warrior",
        setState: { warrior: true },
        nextText: 2,
      },
      {
        text: "become an archer",
        setState: { archer: true },
        nextText: 3,
      },
    ],
  },
  {
    id: 2, //Warrior Path
    text: "You pick up the sword and shield, but neither of them are in good condition. Still, you appreciate the weapon and look to see a sheath on your belt. The bow that previously occupied the corner is replaced with a pile of firewood so you can't change your mind. You put the sword into the sheath and examine the room you are in. There is one entrance and one exit, and it gives you a sense of comfort and belonging. you walk to the exit and go down the stairs into a long cold hallway, dead rats littering the ground. Up aead on your left you see a door, and past that there is a room full of zombies. A skeleton is sitting by the door guarding it, and you have to choose what to do.",
    options: [
      {
        text: "See what is in the room",
        requiredState: (currentState) => currentState.warrior,
        //setState: { sword: true },
        nextText: 5,
      },
      {
        text: "Keep walking towards the zombies",
        requiredState: (currentState) => currentState.warrior,
        //setState: { zombies: true },
        nextText: 12,
      },
    ],
  },
  {
    id: 3, //Archer Path
    text: "You pick up the bow and wrap the quiver around your arm. You leave the room and start walking, looking for any gold you can possibly find. There are the occaionsl few coins in the corners fo the room, but they are near useless compared to the chests full in the trap rooms. You are noticiing just how nice your bow is, when you hear a loud CLUNK! You look down to see your leg stuck in the floor. you let our a cry of pain that echoes through the hallways. You realize one of the floor tiles fell under the weight of your leg. Lifting your leg out of the floor, you assess the damage. Half of your leg is bruised, but the other half is fine. You limp down the hall trying to find food. Luckily, at the end of the hallway you see a turkey sitting on table in a nice dining hall. Unluckily for you however, you see a big group of goblins huddled right around the turkey sitting at the table.",
    options: [
      {
        text: "Shoot a flaming arrow into the room",
        nextText: 4,
      },
      {
        text: "Sneak into the room",
        nextText: 6,
      },
    ],
  },
  {
    id: 4, // Archer Path D option 1
    text: "You wrap a piece of the cloth around the arrow and put the flame of a lighter up to it. You pull back the string, aim, and let go. You duck behind a wall to avoid the heat, but it still singes the hairs on your neck. You wait for a little over a minute, and after you think you got all the goblins, you look around the corner. Miraculously, no goblins remain and the turkey seems perfectly fine, so you start walking. It is a bit crispy on the outside, but you knew it worked as your leg went back to how it was before you fell. You walk out of the room into another identical hallway. An iron door lay at the end, and a wooden door to your left.",
    options: [
      {
        text: "Go through the wooden door",
        nextText: 9,
      },
      {
        text: "Go through the metal door",
        nextText: 10,
      },
    ],
  },
  {
    id: 5, // Warrior Path C option 1
    text: "You unsheath your sword, choosing to fight. The skeleton, seeing you approach, takes out it's sword and runs towards you. You slash it's arm, but the bone is too strong to cut through. You take your sheild, lift it up, and smash it down on top of the skeleton. Shards of bone fly everywhere, and you think you won. As you put your shield away, the skeleton gets up and stabs you in the arm. Filled with rage, you punch it's skull and the skeleton stays down. You enter the room and see a pristine sword leaning against a table in the middle of the room.",
    options: [
      {
        text: "Take the sword",
        nextText: 7,
      },
      {
        text: "Leave without the sword",
        nextText: 8,
      },
    ],
  },
  {
    id: 6, // Archer Path D Option 2
    text: "You decide to try to sneak your way into the room to get the turkey. You creep to the doorway and watch as the goblins get up from the table and walk around the room. One of them punches another, and then a few more join in. You take the opportunity to limp over to the table. You take the platter in your hand and walk out, but your foot catches a misplaced stone, and you drop to the ground. You fall on your face and all the noise stops. You look back to see all the goblins running towards you. you could take the turkey and try to run for it, or you could try to jump onto the chandelier.",
    options: [
      {
        text: "Make a run for it",
        nextText: 15,
      },
      {
        text: "Get to the chandelier",
        nextText: 16,
      },
    ],
  },
  {
    id: 7, // Warrior Path E option 1
    text: "You walk towards the sword, carefully examining the room. You see no signs of a trap, so you pick it up and put it in your sheath. Hissss, you hear, and turn around to see a snake drop from the ceiling. The snake, which is no shorter than a car, slithers towards you. You take out your sword, but it is too late. The snake is already wrapping iteslf around you, and you can't feel your legs. The snake fully envelops you, and your vision fades to black.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 8, // Warrior Path E option 2
    text: "You don't want to take the risk, and leave the sword. Exiting the room, you see a goblin running towards you. It is no taller than your waist, but does not look happy. You remember the granola bar that you brought with you, and you hurredly unwrap it, and toss it onto the ground in front of you. It looks it over with caution, but can't resist and eats it. Right as you think you are safe, more goblins come running at you from all directions like a flock of birds eating bread. They must have smelled it you think, and search your bag for anything else that could possibly help you. You see an apple, and throw it away from you. Most of the goblins go running, but some still walk towards you, trying to get something else. You jump over one and sprint for an escape, dropping your bag to distract the others. The hall is filled with stomps as you get chased by the goblins. You nearly make it out when you trip and get covered in spit from growling goblins. You try to stop them, but it doesn't work, and you feel each and every goblin digging into your flesh.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9, // Archer Path G option 1 (wooden door)
    text: "You open the wooden door and walk into the room. Behind you, the door shuts, and you go back to try to get out, but it won't budge. The room is empty, and you realize you are going to die. Shooting the door does nothing, and yelling doesn't do much either. You aren't appreciated by anything living in the dungeon, so it is worthless. You lay down and try to keep your body heat, and fall asleep, tears dripping down your face.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10, // Archer Path G option 1 (metal door)
    text: "You have to push on the door hard, and it leads to the outside. Big stone walls are all around you protecting you from the wind, and a brick building is in front of you. You walk inside the brick structure to see a rotting wooden table covered in dust and moss, and three plates lay next to silver cups. You walk over to a bed in the opposite side of the room, and are taken by surprise when the springs are still good. It isn't perfect, but it will do. You lay under the covers, and fall asleep to the wind whipping the trees around you.",
    options: [
      {
        text: "Congratulations! Play again.",
        nextText: -1,
      },
    ],
  },
  {
    id: 11, // Warrior Path C option 1
    text: "You unsheath your sword, choosing to fight. The skeleton, seeing you approach, takes out it's sword and runs towards you. You slash it's arm, but the bone is too strong to cut through. You take your shield, lift it up, and smash it down on top of the skeleton. Shards of bone fly everywhere, and you think you won. As you put your shield away, the skeleton gets up and stabs you in the arm. Filled with rage, you punch it's skull, and the skeleton stays down. You enter the room and see a pristine sword leaning against a table in the middle of the room.",
    options: [
      {
        text: "Take the sword",
        nextText: 12,
      },
      {
        text: "Leave without the sword",
        nextText: 12,
      },
    ],
  },
  {
    id: 12, // Warrior Path C option 2
    text: "You don't want to get into a fight you can't win and continue walking. Your deep breaths catch the attention of some of the zombies, and now you know you will have to put up a fight. You stab right into the zombie's chest, and it falls to the ground. A few of the zombies pause, but continue towards you anyway. Yelling, you try to scare away the zombies but it doesn't work, and they start to circle around you. You look back, and the hall is still clear.",
    options: [
      {
        text: "Run back out of the dungeon",
        nextText: 13,
      },
      {
        text: "Take on the zombies",
        nextText: 14,
      },
    ],
  },
  {
    id: 13, // Warrior Path F option 1
    text: "You know you are severely outnumbered, and run back towards the entrance of the dungeon. You look back to see most of the zombies chasing after you. The skeleton, noticing what is going on, jumps up to stop you. You skid into a stop, and take out your shield. You back into a corner, protecting yourself from the tens of zombies banging on the shield. A minute passes, and a crack forms in the sheld. A punch gets thrown, and your defence is in a pile by your feet. Before you have time to react, you are suffocating beneath the weight of all the zombies. The smell is horrible, and you try to puke, but all you can do is lay there and watch as your vision fades to black.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 14, // Warrior Path F Option 2
    text: "You stand your ground as they get closer, noticing all the dust and dirt covering their bodies. You wind back your sword, and whip it out in front of you, hitting three of the unfortunate zombies, who continue to fall to the ground. A zombie leaps out from the crowd on top of you, and lands a punch to your face. You hit it back with your unoccupied hand, and it jumps off of you. You start swinging your sword back and forth loosely, knocking a few ot the ground with every swing. While you pring your sword to your side again, you accidentally drop it, and take out your shield, but it only blocks a few of the hits from in front of you. You finally realise where your sword is, and your heart stops. A zombie lifts it high into the air, and brings it down right onto your head, and all your thoughts stop.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 15, // Archer Path H option 1
    text: "You drop your bow and sprint out of the room, your leg dragging across the ground. The goblins are gaining on you, but they are still a ways back. You go into a random room, closing the door behind you. Clanking comes from the dark, and a sekelton in armor equipped with a sword emerges. You have nowhere to run, and it brings back the sword and stabs you right in the chest. You can't breath, and fall to your knees, a pool of red forming under your feet. It stabs you in the back, and this time you fall to the ground and look up to see it raising the sword one last time, bringing it onto your throat, immediately killing you.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 16, // Archer Path H option 2
    text: "You only have a few seconds, and climb onto the table. You can't reach the chandelier, but the goblins certainly can reach you. The goblins are jumping onto the table, and you put in every last bit of effort you have. You jump as high as you can, and just barely grab the cold dusty chain. You pinch your finger as you are climbing, nearly falling back onto the wood table. You try to lift your leg up, but something is stopping you. Looking down, you see the goblins have a hold of your leg, and are pulling you down inch by inch. One of the goblins bites into your calf. You let out a cry of pain, and let go as you are eaten alive by the starving goblins.",
    options: [
      {
        text: "YOU DIED - Restart",
        nextText: -1,
      },
    ],
  },
];

startGame();
