import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let quotes = [
  { id: 1, quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { id: 2, quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { id: 3, quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { id: 4, quote: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { id: 5, quote: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey" },
  { id: 6, quote: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron" },
  { id: 7, quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 8, quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { id: 9, quote: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { id: 10, quote: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { id: 11, quote: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson" },
  { id: 12, quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { id: 13, quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { id: 14, quote: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", author: "Helen Keller" },
  { id: 15, quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { id: 16, quote: "Whoever is happy will make others happy too.", author: "Anne Frank" },
  { id: 17, quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { id: 18, quote: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { id: 19, quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { id: 20, quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { id: 21, quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { id: 22, quote: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { id: 23, quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { id: 24, quote: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
  { id: 25, quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { id: 26, quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { id: 27, quote: "Life is short, and it's up to you to make it sweet.", author: "Sarah Louise Delany" },
  { id: 28, quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { id: 29, quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 30, quote: "Get busy living or get busy dying.", author: "Stephen King" },
  { id: 31, quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { id: 32, quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { id: 33, quote: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { id: 34, quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { id: 35, quote: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith" },
  { id: 36, quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { id: 37, quote: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { id: 38, quote: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { id: 39, quote: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.", author: "Henry Ford" },
  { id: 40, quote: "In order to write about life first you must live it.", author: "Ernest Hemingway" },
  { id: 41, quote: "The big lesson in life, baby, is never be scared of anyone or anything.", author: "Frank Sinatra" },
  { id: 42, quote: "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.", author: "Leo Burnett" },
  { id: 43, quote: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard" },
  { id: 44, quote: "The unexamined life is not worth living.", author: "Socrates" },
  { id: 45, quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { id: 46, quote: "The way I see it, if you want the rainbow, you gotta put up with the rain.", author: "Dolly Parton" },
  { id: 47, quote: "Do all the good you can, for all the people you can, in all the ways you can, as long as you can.", author: "Hillary Clinton" },
  { id: 48, quote: "Don't settle for what life gives you; make life better and build something.", author: "Ashton Kutcher" },
  { id: 49, quote: "Everything negative - pressure, challenges - is all an opportunity for me to rise.", author: "Kobe Bryant" },
  { id: 50, quote: "I like criticism. It makes you strong.", author: "LeBron James" },
  { id: 51, quote: "You never really learn much from hearing yourself speak.", author: "George Clooney" },
  { id: 52, quote: "Life imposes things on you that you can't control, but you still have the choice of how you're going to live through this.", author: "Celine Dion" },
  { id: 53, quote: "Life is never easy. There is work to be done and obligations to be met - obligations to truth, to justice, and to liberty.", author: "John F. Kennedy" },
  { id: 54, quote: "Live for each second without hesitation.", author: "Elton John" },
  { id: 55, quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
  { id: 56, quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { id: 57, quote: "Life is a succession of lessons which must be lived to be understood.", author: "Ralph Waldo Emerson" },
  { id: 58, quote: "My mama always said, life is like a box of chocolates. You never know what you're gonna get.", author: "Forrest Gump" },
  { id: 59, quote: "Watch your thoughts; they become words. Watch your words; they become actions. Watch your actions; they become habits.", author:"George Clooney"},
  { id: 60, quote: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
  { id: 61, quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { id: 62, quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { id: 63, quote: "Life is short, and it's up to you to make it sweet.", author: "Sarah Louise Delany" },
  { id: 64, quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { id: 65, quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { id: 66, quote: "Get busy living or get busy dying.", author: "Stephen King" },
  { id: 67, quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { id: 68, quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { id: 69, quote: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { id: 70, quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { id: 71, quote: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith" },
  { id: 72, quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { id: 73, quote: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { id: 74, quote: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt" },
  { id: 75, quote: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.", author: "Henry Ford" },    { id: 76, quote: "In order to write about life first you must live it.", author: "Ernest Hemingway" },
  { id: 77, quote: "The big lesson in life, baby, is never be scared of anyone or anything.", author: "Frank Sinatra" },
  { id: 78, quote: "Curiosity about life in all of its aspects, I think, is still the secret of great creative people.", author: "Leo Burnett" },
  { id: 79, quote: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard" },
  { id: 80, quote: "The unexamined life is not worth living.", author: "Socrates" },
  { id: 81, quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { id: 82, quote: "The way I see it, if you want the rainbow, you gotta put up with the rain.", author: "Dolly Parton" },
  { id: 83, quote: "Do all the good you can, for all the people you can, in all the ways you can, as long as you can.", author: "Hillary Clinton" },
  { id: 84, quote: "Don't settle for what life gives you; make life better and build something.", author: "Ashton Kutcher" },
  { id: 85, quote: "Everything negative - pressure, challenges - is all an opportunity for me to rise.", author: "Kobe Bryant" },
  { id: 86, quote: "I like criticism. It makes you strong.", author: "LeBron James" },
  { id: 87, quote: "You never really learn much from hearing yourself speak.", author: "George Clooney" },
  { id: 88, quote: "Life imposes things on you that you can't control, but you still have the choice of how you're going to live through this.", author: "Celine Dion" },
  { id: 89, quote: "Life is never easy. There is work to be done and obligations to be met - obligations to truth, to justice, and to liberty.", author: "John F. Kennedy" },
  { id: 90, quote: "Live for each second without hesitation.", author: "Elton John" },
  { id: 91, quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
  { id: 92, quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { id: 93, quote: "Life is a succession of lessons which must be lived to be understood.", author: "Ralph Waldo Emerson" },
  { id: 94, quote: "My mama always said, life is like a box of chocolates. You never know what you're gonna get.", author: "Forrest Gump" },
  { id: 95, quote: "Watch your thoughts; they become words. Watch your words; they become actions. Watch your actions; they become habits. Watch your habits; they become character. Watch your character; it becomes your destiny.", author: "Lao Tzu" },
  { id: 96, quote: "The best way to predict your future is to create it.", author: "Peter Drucker" },
  { id: 97, quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { id: 98, quote: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { id: 99, quote: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks" },
  { id: 100, quote: "I alone cannot change the world, but I can cast a stone across the water to create many ripples.", author: "Mother Teresa" }
  ];
  

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

// GET a specific post by author
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const filteredQuotes = quotes.filter((quote) => quote.author.trim().toLocaleLowerCase() === type.trim().toLocaleLowerCase());
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    res.json(filteredQuotes[randomIndex]);
  } else {
    res.status(404).json({ error: "No quotes found for this author" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
