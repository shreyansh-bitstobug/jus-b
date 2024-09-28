import { features } from "process";

export const categories = ["Just-JB Partywear", "Just-JB Luxe"];

export const shopBanner = "/assets/banner/shop-banner.png";

export const products = [
  {
    id: "party-1",
    name: "Beige Sleeveless Embellished Dress with long Tassels at hem",
    price: 100,
    image: [
      "/assets/products/partywear/product-beige_sleeveless_embellishes_dress_with_long_tassels_at_hem-1.png",
      "/assets/products/partywear/product-beige_sleeveless_embellishes_dress_with_long_tassels_at_hem-2.jpg",
      "/assets/products/partywear/product-beige_sleeveless_embellishes_dress_with_long_tassels_at_hem-3.jpg",
      "/assets/products/partywear/product-beige_sleeveless_embellishes_dress_with_long_tassels_at_hem-4.jpg",
    ],
    category: "Just-JB Partywear",
    sizes: ["S", "M"],
    description: {
      text: "A stunning beige dress with intricate embellishments and long tassels, perfect for any party.",
      features: ["Sleeveless design", "Embellished details", "Long tassels at hem"],
    },
  },
  {
    id: "party-2",
    name: "Golden Sequined Crisscross Haltere Neck Backless Jumpsuit",
    price: 150,
    image: [
      "/assets/products/partywear/product-golden_sequined_crisscross_haltere_neck_backless_jumpsuit-1.png",
      "/assets/products/partywear/product-golden_sequined_crisscross_haltere_neck_backless_jumpsuit-2.png",
    ],
    category: "Just-JB Partywear",
    sizes: ["S", "M", "L"],
    description: {
      text: "Shine bright in this golden sequined jumpsuit with a crisscross halter neck and backless design.",
      features: ["Crisscross halter neck", "Backless design", "Sequined details"],
    },
  },
  {
    id: "party-3",
    name: "Ivory Sleeveless Tinsel Midi Dress",
    price: 120,
    image: [
      "/assets/products/partywear/product-ivory_sleeveless_tinsel_midi_dress-1.png",
      "/assets/products/partywear/product-ivory_sleeveless_tinsel_midi_dress-2.png",
      "/assets/products/partywear/product-ivory_sleeveless_tinsel_midi_dress-3.png",
    ],
    category: "Just-JB Partywear",
    sizes: ["XS", "S", "M"],
    description: {
      text: "Elegant ivory midi dress with tinsel detailing, perfect for a sophisticated evening.",
      features: ["Sleeveless design", "Tinsel detailing", "Midi length"],
    },
  },
  {
    id: "party-4",
    name: "Midnight Blue Plunge High Slit Dress",
    price: 130,
    image: [
      "/assets/products/partywear/product-midnight_blue_plunge_high_slit_dress-1.png",
      "/assets/products/partywear/product-midnight_blue_plunge_high_slit_dress-2.png",
      "/assets/products/partywear/product-midnight_blue_plunge_high_slit_dress-3.png",
    ],
    category: "Just-JB Partywear",
    sizes: ["M", "L"],
    description: {
      text: "Turn heads in this midnight blue dress with a plunging neckline and high slit.",
      features: ["Plunging neckline", "High slit", "Midnight blue color"],
    },
  },
  {
    id: "party-5",
    name: "Pink Roseline Sequence Noodle Strap Mini Dress",
    price: 110,
    image: [
      "/assets/products/partywear/product-pink_roseline_sequence_noodle_strap_mini_dress-1.png",
      "/assets/products/partywear/product-pink_roseline_sequence_noodle_strap_mini_dress-2.png",
      "/assets/products/partywear/product-pink_roseline_sequence_noodle_strap_mini_dress-3.png",
      "/assets/products/partywear/product-pink_roseline_sequence_noodle_strap_mini_dress-4.png",
    ],
    category: "Just-JB Partywear",
    sizes: ["S", "M", "L"],
    description: {
      text: "Cute and flirty pink mini dress with roseline sequins and noodle straps.",
      features: ["Roseline sequins", "Noodle straps", "Mini length"],
    },
  },
  {
    id: "party-6",
    name: "Silver Sequence One-Sleeve One-Shoulder High Slit Evening Dress",
    price: 140,
    image: [
      "/assets/products/partywear/product-silver_sequence_one-sleeve_one-shoulder_high_slit_evening_dress-1.png",
      "/assets/products/partywear/product-silver_sequence_one-sleeve_one-shoulder_high_slit_evening_dress-2.png",
      "/assets/products/partywear/product-silver_sequence_one-sleeve_one-shoulder_high_slit_evening_dress-3.png",
    ],
    category: "Just-JB Partywear",
    sizes: ["M", "L"],
    description: {
      text: "Dazzle in this silver sequined evening dress with a one-sleeve, one-shoulder design and high slit.",
      features: ["One-sleeve design", "One-shoulder design", "High slit"],
    },
  },
  {
    id: "party-7",
    name: "Spangle Mini Woven Strappy Dress with Tassel Hem",
    price: 115,
    image: [
      "/assets/products/partywear/product-spangle_mini_woven_strappy_dress_with_tassel_hem-1.png",
      "/assets/products/partywear/product-spangle_mini_woven_strappy_dress_with_tassel_hem-2.png",
      "/assets/products/partywear/product-spangle_mini_woven_strappy_dress_with_tassel_hem-3.png",
      "/assets/products/partywear/product-spangle_mini_woven_strappy_dress_with_tassel_hem-4.png",
    ],
    category: "Just-JB Partywear",
    sizes: ["XS", "S", "M"],
    description: {
      text: "A chic mini dress with spangle details, woven strappy design, and tassel hem.",
      features: ["Spangle details", "Woven strappy design", "Tassel hem"],
    },
  },
  {
    id: "luxe-1",
    name: "Ruffled Snowy One-Sleeve One-Shoulder Cutout Waist Dress",
    price: 200,
    image: [
      "/assets/products/luxe/product-ruffled_snowy_one-sleeve_one-shoulder_cutout_waist_dress-1.png",
      "/assets/products/luxe/product-ruffled_snowy_one-sleeve_one-shoulder_cutout_waist_dress-2.png",
      "/assets/products/luxe/product-ruffled_snowy_one-sleeve_one-shoulder_cutout_waist_dress-3.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["S", "M"],
    description: {
      text: "A snowy white dress with ruffled details, one-sleeve, one-shoulder cutout waist design.",
      features: ["Ruffled details", "One-sleeve design", "Cutout waist"],
    },
  },
  {
    id: "luxe-2",
    name: "Luxury Frosted Smock One Sleeve Kaftan Gown",
    price: 250,
    image: [
      "/assets/products/luxe/product-luxury_frosted_smock_one_sleeve_kaftan_gown-1.png",
      "/assets/products/luxe/product-luxury_frosted_smock_one_sleeve_kaftan_gown-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["M", "L"],
    description: {
      text: "A luxurious frosted smock kaftan gown with one sleeve, perfect for a grand event.",
      features: ["Frosted smock design", "One sleeve", "Kaftan style"],
    },
  },
  {
    id: "luxe-3",
    name: "Heavily Embellished Mauve Halter Neck Ruched Gown",
    price: 275,
    image: [
      "/assets/products/luxe/product-heavily_embellished_mauve_halter_neck_ruched_gown-1.png",
      "/assets/products/luxe/product-heavily_embellished_mauve_halter_neck_ruched_gown-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["XS", "S"],
    description: {
      text: "A mauve gown with heavy embellishments, halter neck, and ruched design.",
      features: ["Heavy embellishments", "Halter neck", "Ruched design"],
    },
  },
  {
    id: "luxe-4",
    name: "Green Embellished Sweet Heart Neckline Noodle Strap Gown",
    price: 220,
    image: [
      "/assets/products/luxe/product-green_embellished_sweet_heart_neckline_noodle_strap_gown-1.png",
      "/assets/products/luxe/product-green_embellished_sweet_heart_neckline_noodle_strap_gown-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["S", "M"],
    description: {
      text: "A green gown with sweet heart neckline, noodle straps, and intricate embellishments.",
      features: ["Sweet heart neckline", "Noodle straps", "Intricate embellishments"],
    },
  },
  {
    id: "luxe-5",
    name: "Enchanted Grey One-Shoulder Embellished Ruched Gown",
    price: 230,
    image: [
      "/assets/products/luxe/product-enchanted_grey_one-shoulder_embellished_ruched_gown-1.png",
      "/assets/products/luxe/product-enchanted_grey_one-shoulder_embellished_ruched_gown-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["M", "L"],
    description: {
      text: "An enchanted grey gown with one-shoulder design, embellished and ruched details.",
      features: ["One-shoulder design", "Embellished details", "Ruched design"],
    },
  },
  {
    id: "luxe-6",
    name: "Elegant Black Diamante One-Shoulder Plumes Dress",
    price: 260,
    image: [
      "/assets/products/luxe/product-elegant_black_diamante_one-shoulder_plumes_dress-1.png",
      "/assets/products/luxe/product-elegant_black_diamante_one-shoulder_plumes_dress-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["L", "XL"],
    description: {
      text: "An elegant black dress with diamante details, one-shoulder design, and plumes.",
      features: ["Diamante details", "One-shoulder design", "Plumes"],
    },
  },
  {
    id: "luxe-7",
    name: "Ebony Plunger Halter Neck High Slit Dress",
    price: 240,
    image: [
      "/assets/products/luxe/product-ebony_plunger_halter_neck_high_slit_dress-1.png",
      "/assets/products/luxe/product-ebony_plunger_halter_neck_high_slit_dress-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["S", "M"],
    description: {
      text: "An ebony dress with plunger halter neck and high slit, perfect for a luxurious evening.",
      features: ["Plunger halter neck", "High slit", "Ebony color"],
    },
  },
  {
    id: "luxe-8",
    name: "Bandeau Peacock Teal High Slit Mermaid Silk Gown",
    price: 280,
    image: [
      "/assets/products/luxe/product-bandeau_peacock_teal_high_slit_mermaid_silk_gown-1.png",
      "/assets/products/luxe/product-bandeau_peacock_teal_high_slit_mermaid_silk_gown-2.png",
    ],
    category: "Just-JB Luxe",
    sizes: ["S", "M", "L"],
    description: {
      text: "A peacock teal silk gown with bandeau top, high slit, and mermaid silhouette.",
      features: ["Bandeau top", "High slit", "Mermaid silhouette"],
    },
  },
  {
    id: "holiday-1",
    name: "Festive Red Velvet Dress",
    price: 90,
    image: [
      "/assets/products/holiday/product-festive_red_velvet_dress-1.png",
      "/assets/products/holiday/product-festive_red_velvet_dress-2.png",
    ],
    category: "Holiday Season",
    sizes: ["S", "M", "L"],
    description: {
      text: "A festive red velvet dress, perfect for holiday celebrations.",
      features: ["Red velvet", "Festive design", "Perfect for holidays"],
    },
  },
  {
    id: "holiday-2",
    name: "Green Sequin Holiday Gown",
    price: 120,
    image: [
      "/assets/products/holiday/product-green_sequin_holiday_gown-1.png",
      "/assets/products/holiday/product-green_sequin_holiday_gown-2.png",
    ],
    category: "Holiday Season",
    sizes: ["M", "L"],
    description: {
      text: "A green sequin gown, ideal for holiday parties and events.",
      features: ["Green sequins", "Holiday design", "Perfect for parties"],
    },
  },
  {
    id: "holiday-3",
    name: "Gold Sparkle Mini Dress",
    price: 110,
    image: [
      "/assets/products/holiday/product-gold_sparkle_mini_dress-1.png",
      "/assets/products/holiday/product-gold_sparkle_mini_dress-2.png",
    ],
    category: "Holiday Season",
    sizes: ["XS", "S", "M"],
    description: {
      text: "A gold sparkle mini dress, perfect for festive occasions.",
      features: ["Gold sparkle", "Mini length", "Festive design"],
    },
  },
  {
    id: "holiday-4",
    name: "Silver Glitter Evening Gown",
    price: 150,
    image: [
      "/assets/products/holiday/product-silver_glitter_evening_gown-1.png",
      "/assets/products/holiday/product-silver_glitter_evening_gown-2.png",
    ],
    category: "Holiday Season",
    sizes: ["S", "M", "L"],
    description: {
      text: "A silver glitter evening gown, perfect for glamorous holiday events.",
      features: ["Silver glitter", "Evening gown", "Glamorous design"],
    },
  },
  {
    id: "holiday-5",
    name: "Blue Velvet Holiday Dress",
    price: 95,
    image: [
      "/assets/products/holiday/product-blue_velvet_holiday_dress-1.png",
      "/assets/products/holiday/product-blue_velvet_holiday_dress-2.png",
    ],
    category: "Holiday Season",
    sizes: ["M", "L"],
    description: {
      text: "A blue velvet dress, perfect for holiday gatherings.",
      features: ["Blue velvet", "Holiday design", "Perfect for gatherings"],
    },
  },
  {
    id: "holiday-6",
    name: "White Snowflake Gown",
    price: 130,
    image: [
      "/assets/products/holiday/product-white_snowflake_gown-1.png",
      "/assets/products/holiday/product-white_snowflake_gown-2.png",
    ],
    category: "Holiday Season",
    sizes: ["S", "M"],
    description: {
      text: "A white gown with snowflake details, perfect for winter holidays.",
      features: ["White color", "Snowflake details", "Winter holiday design"],
    },
  },
  {
    id: "holiday-7",
    name: "Black Sequin Party Dress",
    price: 105,
    image: [
      "/assets/products/holiday/product-black_sequin_party_dress-1.png",
      "/assets/products/holiday/product-black_sequin_party_dress-2.png",
    ],
    category: "Holiday Season",
    sizes: ["S", "M", "L"],
    description: {
      text: "A black sequin dress, perfect for holiday parties.",
      features: ["Black sequins", "Party design", "Perfect for holidays"],
    },
  },
  {
    id: "holiday-8",
    name: "Purple Satin Holiday Gown",
    price: 140,
    image: [
      "/assets/products/holiday/product-purple_satin_holiday_gown-1.png",
      "/assets/products/holiday/product-purple_satin_holiday_gown-2.png",
    ],
    category: "Holiday Season",
    sizes: ["M", "L"],
    description: {
      text: "A purple satin gown, perfect for elegant holiday events.",
      features: ["Purple satin", "Elegant design", "Perfect for holidays"],
    },
  },
  {
    id: "holiday-9",
    name: "Emerald Green Holiday Dress",
    price: 115,
    image: [
      "/assets/products/holiday/product-emerald_green_holiday_dress-1.png",
      "/assets/products/holiday/product-emerald_green_holiday_dress-2.png",
    ],
    category: "Holiday Season",
    sizes: ["XS", "S", "M"],
    description: {
      text: "An emerald green dress, perfect for festive holiday gatherings.",
      features: ["Emerald green", "Festive design", "Perfect for gatherings"],
    },
  },
  {
    id: "holiday-10",
    name: "Red and Gold Festive Gown",
    price: 160,
    image: [
      "/assets/products/holiday/product-red_and_gold_festive_gown-1.png",
      "/assets/products/holiday/product-red_and_gold_festive_gown-2.png",
    ],
    category: "Holiday Season",
    sizes: ["S", "M", "L"],
    description: {
      text: "A red and gold gown, perfect for festive holiday celebrations.",
      features: ["Red and gold", "Festive design", "Perfect for celebrations"],
    },
  },
];
export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};
