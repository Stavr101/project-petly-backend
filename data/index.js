const mongoose = require("mongoose");

const newsIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const news = [
  {
    _id: newsIds[0],
    title:
      "ManxSPCA urges people to consider long-term costs before gifting pets",
    link: "https://www.bbc.com/news/world-europe-isle-of-man-64039202",
    release: new Date().toLocaleDateString("en-US"),
    content:
      "A Manx animal welfare charity has urged people to consider the long-term cost of pets before giving them as gifts. Around 30% of dogs and cats in the ManxSPCA's care this year have had to be rehomed because the owners could not afford to keep them. General manager Juana Warburton said the animals' basic vet bills could be £450 a year, on top of daily needs.The charity has also seen a trend of puppies bought during the pandemic being put up for adoption, she added.",
  },
  {
    _id: newsIds[1],
    title: "Staffordshire bull terriers are most-stolen London dog",
    link: "https://www.bbc.com/news/uk-england-london-64043850",
    release: new Date().toLocaleDateString("en-US"),
    content:
      "Staffordshire bull terriers were recorded as the most-stolen dog breed in London, police figures reveal.There were 496 of them taken out of 3,102 recorded stolen dogs since the Metropolitan Police began collecting the data in 2012. Another 142 of the stolen pets were listed as Staffordshire bull terriers crosses. Chihuahuas were the second-most stolen with 209 and third were French bulldogs with 146.",
  },
  {
    _id: newsIds[2],
    title: "Why some cats just go where they want",
    link: "https://www.bbc.com/news/uk-england-cambridgeshire-63665614",
    release: new Date().toLocaleDateString("en-US"),
    content:
      "From taking up residence in supermarkets to making a hospital their second home, some cats will go pretty much where they want. Some just crave company and attention, says cat biologist and behaviourist Roger Tabor, but most cats don't do this and these are the oddballs. Is it possible to police a cat in such situations?",
  },
  {
    _id: newsIds[3],
    title: "PAWS animal rescue charity's plea for new home",
    link: "https://www.bbc.com/news/uk-england-leeds-63988419",
    release: new Date().toLocaleDateString("en-US"),
    content:
      "Volunteers at an animal rescue charity in West Yorkshire have pleaded for help in their search for a new home.Todmorden-based PAWS has been seeking new premises since February, following a notice to vacate from its landlord.The charity said it had until January 2023 before it faced court action over leaving its current site.The charity and its 13 kittens, 16 cats and 12 dogs faced an horrific future if it did not manage to secure new premises, volunteers have warned.",
  },
  {
    _id: newsIds[4],
    title: "Cost of living puts the crunch on pet owners",
    link: "https://www.bbc.com/news/uk-england-suffolk-62724631",
    release: new Date().toLocaleDateString("en-US"),
    content:
      "The soaring demand for help with vet fees due to the cost of living increase has resulted in the RSPCA opening a new clinic to help struggling pet owners.The charity has opened a facility in Stowmarket, Suffolk, after seeing so many owners requesting help at its other clinic near Ipswich.Its Ipswich Welfare Clinic, which opened in 1962, treats between 170 and 190 animals each month - an increase of about 20% since July last year.The new site is appointment-only.",
  },
  {
    _id: newsIds[5],
    title: "War in Ukraine: 'Pets are getting left at train stations'",
    link: "https://www.bbc.com/news/av/world-europe-60848142",
    release: new Date().toLocaleDateString("en-US"),
    content:
      "A man from Guildford has travelled from the UK to west Ukraine to try and bring some of the pets abandoned because of the war to safety. Photographer Nick Tadd has teamed up with a network of volunteers, taking over supplies and bringing the animals back across the border to a shelter in Poland. Mr Tadd is documenting his work on social media and hopes to raise money for more supplies and a new ambulance for the animals.",
  },
];

module.exports = {
  news,
};
