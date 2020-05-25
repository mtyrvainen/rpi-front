const animals = ['Cat','Dog','Donkey','Goat','Horse','Pig','Rabbit','Baboon','Badger','Bandicoot','Chimpanzee','Crayfish','Fly','Gorilla','Jellyfish','Loon','Narwhal','Otter','Owl','Platypus','Puma','Python','Rhinoceros','Roadrunner','Rodent','Scorpion','Smelt','Snail','Snake','Squid','Squirrel','Starfish','Swordfish','Thrush','Tick','Tiger','Weasel','Whale','Yak','Zebra']
const adjectives = ['abandoned','bewitched','carefree','dangerous','ecstatic','famous','giant','harmless','illegal','jubilant','lame','mediocre']

export const createRandomUsername = () => {
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${animals[Math.floor(Math.random() * animals.length)].toLowerCase()}#${Math.floor(Math.random()*1000)}`
}
