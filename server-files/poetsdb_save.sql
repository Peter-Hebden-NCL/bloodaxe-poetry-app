-- This is a sample of 3 poets' data from the MySQL database that feeds the Bloodaxe Poetry app.


-- phpMyAdmin SQL Dump
-- version 4.1.14.8
-- http://www.phpmyadmin.net
--

-- Generation Time: Jan 08, 2018 at 03:11 PM
-- Server version: 5.5.58-0+deb7u1-log
-- PHP Version: 5.4.45-0+deb7u11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--

--

-- --------------------------------------------------------

--
-- Table structure for table `poetsdb`
--

CREATE TABLE IF NOT EXISTS `poetsdb` (
  `id_number` int(11) NOT NULL AUTO_INCREMENT,
  `id_name` varchar(24) CHARACTER SET utf8 DEFAULT NULL,
  `first_name` varchar(22) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `author_link` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `poem_title` varchar(39) CHARACTER SET utf8 DEFAULT NULL,
  `poem_text` varchar(2353) CHARACTER SET utf8 DEFAULT NULL,
  `featured_book_title` varchar(38) CHARACTER SET utf8 DEFAULT NULL,
  `featured_book_link` varchar(84) CHARACTER SET utf8 DEFAULT NULL,
  `audio` int(11) DEFAULT NULL,
  `audio_embed` int(11) DEFAULT NULL,
  `video` int(11) DEFAULT NULL,
  `video_embed` varchar(143) CHARACTER SET utf8 DEFAULT NULL,
  `video_start` int(11) DEFAULT NULL,
  `video_end` int(11) DEFAULT NULL,
  `bio` varchar(4805) CHARACTER SET utf8 DEFAULT NULL,
  `themes` varchar(46) CHARACTER SET utf8 DEFAULT NULL,
  `user_themes` varchar(13) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id_number`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=378 ;

--
-- Dumping data for table `poetsdb`
--

INSERT INTO `poetsdb` (`id_number`, `id_name`, `first_name`, `last_name`, `author_link`, `poem_title`, `poem_text`, `featured_book_title`, `featured_book_link`, `audio`, `audio_embed`, `video`, `video_embed`, `video_start`, `video_end`, `bio`, `themes`, `user_themes`) VALUES
(1, 'fleur-adcock', 'Fleur', 'Adcock', 'http://www.bloodaxebooks.com/ecs/category/fleur-adcock', 'Weathering', '<p>Literally thin-skinned, I suppose, my face</p><p>catches the wind off the snow-line and flushes</p><p>with a flush that will never wholly settle. Well:</p><p>that was a metropolitan vanity,</p><p>wanting to look young for ever, to pass.</p><p>&nbsp;</p><p>I was never a pre-Raphaelite beauty</p><p>nor anything but pretty enough to satisfy</p><p>men who need to be seen with passable women.</p><p>But now that I am in love with a place</p><p>which doesn&rsquo;t care how I look, or if I&rsquo;m happy,</p><p>&nbsp;</p><p>happy is how I look, and that&rsquo;s all.</p><p>My hair will grow grey in any case,</p><p>my nails chip and flake, my waist thicken,</p><p>and the years work all their usual changes.</p><p>If my face is to be weather-beaten as well</p><p>&nbsp;</p><p>that&rsquo;s little enough lost, a fair bargain</p><p>for a year among the lakes and fells, when simply</p><p>to look out of my window at the high pass</p><p>makes me indifferent to mirrors and to what</p><p>my soul may wear over its new complexion.</p>', 'Poems 1960-2000', 'http://www.bloodaxebooks.com/ecs/product/poems-1960-2000-658', 0, 0, 1, 'https://player.vimeo.com/video/1859518', 0, 0, '<p>Fleur Adcock writes about men and women, childhood, identity, roots and rootlessness, memory and loss, animals and dreams, as well as our interactions with nature and place. Her poised, ironic poems are remarkable for their wry wit, conversational tone and psychological insight, unmasking the deceptions of love or unravelling family lives.</p>\r\n<p>Born in New Zealand in 1934, she spent the war years in England, returning with her family to New Zealand in 1947. She emigrated to Britain in 1963, working as a librarian in London until 1979. In 1977-78 she was writer-in-residence at Charlotte Mason College of Education, Ambleside. She was Northern Arts Literary Fellow in 1979-81, living in Newcastle, becoming a freelance writer after her return to London. She received an OBE in 1996, and the Queen&rsquo;s Gold Medal for Poetry in 2006 for <em>Poems 1960-2000</em> (Bloodaxe Books, 2000).</p>\r\n<p>Fleur Adcock published three pamphlets with Bloodaxe: <em>Below Loughrigg</em> (1979), <em>Hotspur</em> (1986) and <em>Meeting the Comet</em> (1988), as well as her translations of medieval Latin lyrics, <em>The Virgin &amp; the Nightingale</em> (1983). All her collections were then published by Oxford University Press until they shut down their poetry list in 1999, after which Bloodaxe published her collected poems <em>Poems 1960-2000</em> (2000), followed by <em>Dragon Talk</em> (2010), <em>Glass Wings</em> (2013) and <em>The Land Ballot</em> (2015). <em>Poems 1960-2000</em> is a Poetry Book Society Special Commendation and <em>Glass Wings</em> is a Poetry Book Society Recommendation.</p>', 'childhood,identity,memory,nature,family', 'new zealand,'),
(2, 'kim-addonizio', 'Kim', 'Addonizio', 'http://www.bloodaxebooks.com/ecs/category/kim-addonizio', 'What Do Women Want?', '<p>I want a red dress.</p><p>I want it flimsy and cheap,</p><p>I want it too tight, I want to wear it</p><p>until someone tears it off me.</p><p>I want it sleeveless and backless,</p><p>this dress, so no one has to guess</p><p>what&rsquo;s underneath. I want to walk down</p><p>the street past Thrifty&rsquo;s and the hardware store</p><p>with all those keys glittering in the window,</p><p>past Mr and Mrs Wong selling day-old</p><p>donuts in their caf&eacute;, past the Guerra brothers</p><p>slinging pigs from the truck and onto the dolly,</p><p>hoisting the slick snouts over their shoulders.</p><p>I want to walk like I&rsquo;m the only</p><p>woman on earth and I can have my pick.</p><p>I want that red dress bad.</p><p>I want it to confirm</p><p>your worst fears about me,</p><p>to show you how little I care about you</p><p>or anything except what</p><p>I want. When I find it, I&rsquo;ll pull that garment</p><p>from its hanger like I&rsquo;m choosing a body</p><p>to carry me into this world, through</p><p>the birth-cries and the love-cries too,</p><p>and I&rsquo;ll wear it like bones, like skin,</p><p>it&rsquo;ll be the goddamned</p><p>dress they bury me in.</p>', 'Wild Nights', 'http://www.bloodaxebooks.com/ecs/product/wild-nights-299', 0, 0, 0, '', 0, 0, '<p>\r\n	Kim Addonizio was born in 1954. After living for most of her adult life in California, she is currently based in New York City. Her poetry books include <em>The Philosopher&rsquo;s Club</em> (1994), <em>Jimmy &amp; Rita</em> (1997), <em>Tell Me</em> (2000), <em>What Is This Thing Called Love</em> (2004), <em>Lucifer at the Starlite</em> (2009), <em>My Black Angel: Blues Poems and Portraits</em> (2014), and now her first UK publication, <em>Wild Nights: New &amp; Selected Poems</em> (2015) from Bloodaxe. She has also published fiction, notably the novels <em>Little Beauties</em> (2005) and <em>My Dreams Out in the Street</em> (2007), and the short story collection <em>The Palace of Illusions</em> (2014). She collaborated with Dorianne Laux on <em>The Poet&rsquo;s Companion: A Guide to the Pleasures of Writing Poetry</em> (1997), and published another poetry guide called <em>Ordinary Genius: A Guide for the Poet Within</em> (2009). She often incorporates her love of blues harmonica into her readings. Her <em>Wild Nights</em> was launched with readings in Britain in early November 2015.</p>', 'music,women,night,identity,love', ''),
(3, 'anna-akhmatova', 'Anna', 'Akhmatova', 'http://www.bloodaxebooks.com/ecs/category/anna-akhmatova', 'On the Road', '<p>A land not our own</p>\r\n<p>and yet eternally memorable,</p>\r\n<p>and in the sea there is tender-iced</p>\r\n<p>and fresh water.</p>\r\n<p>&nbsp;</p>\r\n<p>On the bottom - sand whiter than chalk,</p>\r\n<p>and the air is drunk as wine,</p>\r\n<p>and the rose-pink mass of the pines</p>\r\n<p>is laid bare in the sunset hour.</p>\r\n<p>&nbsp;</p>\r\n<p>The sunset itself in the sea air</p>\r\n<p>is such that I cannot tell</p>\r\n<p>if this is the end of the day or of the world,</p>\r\n<p>or the secret of secrets is within me again.</p>', 'Selected Poems', 'http://www.bloodaxebooks.com/ecs/product/selected-poems-327', 0, 0, 0, '', 0, 0, ' <p>\r\n	Anna Akhmatova (1889-1966) was Russia&rsquo;s greatest modern poet. She published her first book of poems in 1912, and in the same year founded the Acmeist movement with her husband, the poet Gumilev. Her intense, highly personal love lyrics were later attacked as anti-revolutionary, and in 1925 her poetry was banned.</p>	\r\n<p>\r\n	Gumilev was shot in 1921 for alleged involvement in an anti-Bolshevik plot, and in the years of terror which followed under Stalin, Akhmatova was persecuted for her work along with fellow poets Mandelstam, who died in a camp, and Tsvetaeva, who committed suicide. She was able to publish some work during the war, but in 1946 she again came under attack, this time from Zhdanov, who denounced her with Pasternak and others for trying to &lsquo;poison the minds&rsquo; of Soviet youth.</p>\r\n<p>\r\n	These were attacks on her <em>published</em> work. What she was writing &ndash; but could not publish &ndash; was far more dangerous. For she had entered her years of silence. As she fought for her son&rsquo;s release from prison, she was writing her greatest poetry: the cycle <em>Requiem</em>, which commemorated all of Stalin&rsquo;s victims, and Poem without a hero, which she began in 1940 and worked on for over 20 years.</p>\r\n<p>\r\n	All she wrote she committed to memory. Several trusted friends also memorised her poems, among them Mandelstam&rsquo;s widow Nadezhda. She wrote nothing down, and so survived, the people&rsquo;s conscience, the one who kept &#39;the great Russian word&#39; alive. </p>', 'freedom,memory,death,love,fear', 'russia,');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
