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
    text: "You are walking through a dark forest, but a wind storm comes along and you go into a dungeon. You see a sword and a shield in one corner of the room, and a quiver of arrows next to a bow on the other side of the room.",
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
    text: "You pick up the sword and sheld, but neither of them are in good condition. Still, you appreciate the weapon and look to see4 a sheath on your belt. The bow that previously occupied the corner is replaced with a pile of firewood so you can't change your mind anyway. You put the sword into the sheath and examine the room you are in. There is one entrance and one exit, but it gives you a sense of belonging and comfrot, like it is your home. you walk to the exit and go down the stairs into a long, cold hallway.",
    options: [
      {
        text: "See what is in the room",
        requiredState: (currentState) => currentState.warrior,
        setState: { blueGoo: false, sword: true },
        nextText: 4,
      },
      {
        text: "Keep walking towards  the zombies",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 4,
      },
    ],
  },
  {
    id: 3,
    text: "You pick up the bow and wrap the quiver around your arm. You leave the room and start walking, looking for any gold you can possibly find. There are the occaionsl few coins in the corners fo the room, but they are near useless compared to the full chests in the trap rooms. You are noticiing just how nice your bow is, when you hear a loud CLUNK! You look down to see your leg stuck in the floor. you let our a cry of pain that echoes throug the hallways. You realize one of the floor tiles fell under the weight of your leg. Lifting your leg out of the floor, you assess the damage. Half of your leg is bruised, but the other half is fine. You limp down the hall trying to find food. Luckily, at the end of the hallway you see a turkey sitting on table in a nice dining hall. Unlickily for you however, you see a big group of goblins huddled right around the turkey sitting at the table.",
    options: [
      {
        text: "Shoot a flaming arrow into the room",
        nextText: 4,
      },
      {
        text: "Sneak into the room",
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: "You wrap a piece of the cloth around the arrow and put the flame of a lighter up to it. You pull back the string, aim, and let go. You duck behind a wall to avoid the heat, but it still singes the hairs on your neck. You wait for a little over a minute, and after you think you got all the goblins, you look around the corner. Miraculously, no goblins remain adn teh turkey is perfectly fin. You walk over to it, sit down, and enjoy a nice turkey.",
    options: [
      {
        text: "option 1",
        nextText: -1,
      },
      {
        text: "option 2",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "You unsheath your sword, choosing to fight. The skeleton, seeing you approach, takes out it's sword and runs towards you. You slash it's arm, but the bone is too strong to cut through. You take your sheile, lift it up, and smash it down on top of the skeleton. Shards of bone fly everywhere, and you think you won. As you put your shield awa, the skeleton gets up and stabs you in the arm. Filled with rage, you punch it's skull and the skeleton stays down. You enter the room and see a pristine sword leaning against a talbe in the middle of the room.",
    options: [
      {
        text: "Take the sword",
        nextText: -1,
      },
      {
        text: "Leave without the sword",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "You decide to try to sneak your way into the room to get the turkey. You creep to the doorway and watch as the goblins get up from the table and walk aroudn the r4oom. One of them punchas another one, and then a few more join in. You take the opportunity and start to limp to the table. You look at the goblins, but they haven't seen you yet, so you continue on your way to the turkey.",
    options: [
      {
        text: "Option 1",
        nextText: 7,
      },
      {
        text: "Option 2",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: "You walk towards the sword, carefully examining the room. You see no signs of a trap, so you pick it up and put it in your sheath. Hisss, you hear, and turn around to see a snake drop from the ceiling. The snake, which is no shorter than a car, slithers towards you. You take out your sword, but it is too late. The snake is already wrapping iteslf around you, and you can't feel your legs. The snake full envelops you, squeezing slowly, and your vision fades to black",
    options: [
      {
        text: "Try to run",
        nextText: 8,
      },
      {
        text: "Attack it with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "Throw the blue goo at it",
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Your attempts to run are in vain and the monster easily catches.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: "You foolishly thought this monster could be slain with a single sword.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "The monster laughed as you hid behind your shield and ate you.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: "You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
      },
    ],
  },
];

startGame();
