
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  shopId: number;
  colors?: string[];
  sizes?: string[];
}

export interface Shop {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  rating: number;
  totalProducts: number;
  category: string;
  isVerified: boolean;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const shops: Shop[] = [
  {
    id: 1,
    name: "CORE",
    logo: "https://avatars.mds.yandex.net/get-altay/5296145/2a000001807397bfef4718bb35cedccbc871/orig",
    banner: "https://avatars.mds.yandex.net/get-altay/5296145/2a000001807397bfef4718bb35cedccbc871/orig",
    description: "Har xil turdagi kiyim do'koni",
    rating: 4.8,
    totalProducts: 24,
    category: "Kiyim do'kon",
    isVerified: true
  },
  {
    id: 2,
    name: "Zara",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxWDS3kzc18ChJXfIT7wsKka6trMF4Da3Pw&s",
    banner: "https://nova24.uz/wp-content/uploads/2023/07/Zara-v-MEGE-Parnas_1-cropped-original-1605008719-1024x684.jpg",
    description: "Har xil turdagi kiyim do'koni",
    rating: 4.6,
    totalProducts: 30,
    category: "Kiyim do'kon",
    isVerified: true
  },
  {
    id: 3,
    name: "PULL & BEAR",
    logo: "https://brand-info.com.ua/wp-content/uploads/2020/12/pullbear-logo.jpg",
    banner: "https://www.twenty.it/images/content/114052_13175_1_C_1170_660_0_5061146/pull-bear-twenty-shopping-bolzano.jpg",
    description: "Har xil turdagi kiyim do'koni",
    rating: 4.9,
    totalProducts: 18,
    category: "Kiyim do'kon",
    isVerified: true
  },
  {
    id: 4,
    name: "LC Waikiki",
    logo: "https://static.tildacdn.com/tild3531-6631-4430-a230-323635376637/lc_waikiki.png",
    banner: "https://idsb.tmgrup.com.tr/ly/uploads/images/2020/12/23/81027.jpg",
    description: "Har xil turdagi kiyim do'koni",
    rating: 4.7,
    totalProducts: 27,
    category: "Kiyim do'kon",
    isVerified: true
  },
    {
    id: 5,
    name: "Pandora",
    logo: "https://pandoragroup.com/-/media/images/media/logo/pandora_logo_blank.jpg",
    banner: "https://rstatic.pandora.net/locations/82263_5000141_interior_03.jpg",
    description: "Kumush va oltin mahsulotlari",
    rating: 4.7,
    totalProducts: 22,
    category: "Zargarlik do'koni",
    isVerified: true
  },
      {
    id: 6,
    name: "Selfie",
    logo: "https://static6.tgstat.ru/channels/_0/69/6948278043fdfe95e042bc2075dfd00c.jpg",
    banner: "https://compassmall.uz/wp-content/uploads/IMG_0308.jpg",
    description: "Har xil turdagi kiyim do'koni",
    rating: 4.8,
    totalProducts: 43,
    category: "Kiyim do'kon",
    isVerified: true
  }
];

export const products: Product[] = [
  // CORE Products (shopId: 1)
  {
    id: 1,
    name: "T-SHIRT WITH CONTRAST BOWS",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://static.zara.net/assets/public/d793/8874/2bb540b6aea3/ea0f05d34ba1/05644834250-p/05644834250-p.jpg?ts=1751466636433&w=576",
    category: "Women",
    description: "Ultra-soft premium cotton t-shirt with modern fit. Perfect for everyday wear.",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    shopId: 1,
    colors: ["White", "Black", "Green", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "CROPPED DOUBLE-BREASTED LINEN BLEND BLAZER",
    price: 29.99,
    image: "https://static.zara.net/assets/public/d4f9/464f/379f49e8a58c/69ab39d2999f/08141709510-p/08141709510-p.jpg?ts=1752839440766&w=504",
    category: "Women",
    description: "Professional blazer perfect for meetings and formal occasions.",
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
    shopId: 1,
    colors: ["Black", "Navy", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Casual Denim Jeans",
    price: 59.99,
    image: "https://static.zara.net/assets/public/8781/a419/4c1a475889f8/6d79f2107703/09942156427-e1/09942156427-e1.jpg?ts=1752589107964&w=576",
    category: "Women",
    description: "Comfortable slim-fit denim jeans for everyday wear.",
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    shopId: 1,
    colors: ["Blue", "Black", "Dark Blue"],
    sizes: ["30", "32", "34", "36", "38"]
  },
  {
    id: 4,
    name: "STUDDED BUCKLE SANDALS",
    price: 49.99,
    image: "https://static.zara.net/assets/public/be6a/eea1/02d24f208df6/18b12dd65916/12607610032-ult22/12607610032-ult22.jpg?ts=1752236729997&w=1280",
    category: "Shoes",
    description: "Comfortable athletic sneakers perfect for sports and daily activities.",
    rating: 4.7,
    reviewCount: 23,
    inStock: true,
    shopId: 1,
    colors: ["White", "Black", "Blue"],
    sizes: ["40", "41", "42", "43", "44"]
  },

  // Zara Products (shopId: 2)
  {
    id: 5,
    name: "WAXED-EFFECT JACKET",
    price: 59.99,
    originalPrice: 59.99,
    image: "https://static.zara.net/assets/public/7a1b/329a/925744dc9d46/bb2e06214d54/08281420407-e1/08281420407-e1.jpg?ts=1737456474920&w=504",
    category: "Men",
    description: "Classic denim jacket with modern styling and premium finish.",
    rating: 4.6,
    reviewCount: 13,
    inStock: true,
    shopId: 2,
    colors: ["Blue", "Black", "White"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "ZW COLLECTION STRIPED WRAP DRESS",
    price: 45.99,
    image: "https://static.zara.net/assets/public/07e0/9b33/ade24365a608/990476341299/03829158400-p/03829158400-p.jpg?ts=1752509242992&w=504",
    category: "Women",
    description: "Elegant summer dress perfect for any occasion. Lightweight and comfortable.",
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
    shopId: 2,
    colors: ["Floral", "Red", "Blue", "Green"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Designer Handbag",
    price: 12.99,
    image: "https://static.zara.net/assets/public/f1e8/1991/cc89457aaf22/7deb71d40416/16212610500-ult22/16212610500-ult22.jpg?ts=1752821960177&w=1280",
    category: "Accessories",
    description: "Luxury designer handbag made from premium materials.",
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    shopId: 2,
    colors: ["Black", "Brown", "Beige"],
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "COLLECTION CULOTTES",
    price: 39.99,
    image: "https://static.zara.net/assets/public/ffd3/846f/766c4765882e/572af461a08e/07149052800-p/07149052800-p.jpg?ts=1750674848032&w=504",
    category: "Women",
    description: "Elegant high-waist trousers perfect for office and casual wear.",
    rating: 4.5,
    reviewCount: 13,
    inStock: true,
    shopId: 2,
    colors: ["Black", "Navy", "Gray", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 9,
    name: "Silk Blouse",
    price: 29.99,
    image: "https://static.zara.net/assets/public/cd5a/8c46/d09a4040bd19/014756b06d38/08272447711-p/08272447711-p.jpg?ts=1752572992154&w=504",
    category: "Women",
    description: "Luxurious silk blouse with elegant design for sophisticated look.",
    rating: 4.9,
    reviewCount: 12,
    inStock: true,
    shopId: 2,
    colors: ["White", "Black", "Burgundy", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },

  // Pull & Bear Products (shopId: 3)
  {
    id: 10,
    name: "Casual Hoodie",
    price: 34.99,
    image: "https://static.zara.net/assets/public/18c5/4f6c/f8734ca8ba79/fcd9a3fcd5ec/00761428251-e1/00761428251-e1.jpg?ts=1742485042027&w=504",
    category: "Men",
    description: "Comfortable cotton hoodie perfect for casual wear and layering.",
    rating: 4.4,
    reviewCount: 19,
    inStock: true,
    shopId: 3,
    colors: ["Gray", "Black", "Navy", "Green"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 11,
    name: "Youth girl",
    price: 19.99,
    image: "https://static.zara.net/assets/public/63e3/0c4e/a70e4eb0ae26/ac5216745f33/05431727712-p/05431727712-p.jpg?ts=1751875862974&w=1280",
    category: "Kids",
    description: "https://static.zara.net/assets/public/9adb/ca5f/946a46b7abe9/b1001a9a3814/06318328712-e1/06318328712-e1.jpg?ts=1739261411012&w=504",
    rating: 4.6,
    reviewCount: 24,
    inStock: true,
    shopId: 3,
    colors: ["White", "Black", "Blue", "Red"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 12,
    name: "JEANS Z.02 STRAIGHT ANKLE HIGH-WAIST",
    price: 49.99,
    originalPrice: 64.99,
    image: "https://static.zara.net/assets/public/5a2b/7007/6e5245e6b30a/4a8e4bdc5c6f/06164059406-1-p/06164059406-1-p.jpg?ts=1752244376723&w=504",
    category: "Women",
    description: "Trendy distressed denim jeans with modern fit and style.",
    rating: 4.3,
    reviewCount: 17,
    inStock: true,
    shopId: 3,
    colors: ["Light Blue", "Dark Blue", "Black"],
    sizes: ["26", "28", "30", "32", "34"]
  },
  {
    id: 13,
    name: "Canvas Sneakers",
    price: 39.99,
    image: "https://static.zara.net/assets/public/9588/b85e/d1e94681ae54/05eb880c581b/15428510105-e1/15428510105-e1.jpg?ts=1741621400625&w=504",
    category: "Shoes",
    description: "Classic canvas sneakers perfect for casual outings and street style.",
    rating: 4.5,
    reviewCount: 19,
    inStock: true,
    shopId: 3,
    colors: ["White", "Black", "Red", "Blue"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"]
  },

  // LC Waikiki Products (shopId: 4)
  {
    id: 14,
    name: "100% SILK JACQUARD TIE",
    price: 12.99,
    image: "https://static.zara.net/assets/public/f518/68cf/5bde4819a282/5a20410dab4a/04201303401-e1/04201303401-e1.jpg?ts=1752217145856&w=504",
    category: "Men",
    description: "Affordable quality cotton t-shirt for everyday comfort.",
    rating: 4.2,
    reviewCount: 32,
    inStock: true,
    shopId: 4,
    colors: ["White", "Black", "Gray", "Navy", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 15,
    name: "Kids Uniform",
    price: 24.99,
    image: "https://static.zara.net/assets/public/a0df/bc4b/af2e44a79bf9/8def4b3fc0a3/03854773712-e1/03854773712-e1.jpg?ts=1749042882823&w=504",
    category: "Kids",
    description: "Complete uniform set with comfortable fabric and durable design.",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    shopId: 4,
    colors: ["Navy", "Black", "Gray"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"]
  },
  {
    id: 16,
    name: "Women's Cardigan",
    price: 29.99,
    image: "https://static.zara.net/assets/public/f8da/61dc/f90b4cc2a836/2718c5d27363/06674311737-e1/06674311737-e1.jpg?ts=1752506469269&w=504",
    category: "Women",
    description: "Cozy knitted cardigan perfect for layering in all seasons.",
    rating: 4.4,
    reviewCount: 198,
    inStock: true,
    shopId: 4,
    colors: ["Beige", "Gray", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 17,
    name: "Basic Denim Jeans",
    price: 19.99,
    originalPrice: 29.99,
    image: "https://static.zara.net/assets/public/aba7/d678/b6f94c31b427/eedd4c1c7e35/04048410427-e1/04048410427-e1.jpg?ts=1738841336910&w=504",
    category: "Men",
    description: "Classic straight-leg denim jeans at an affordable price.",
    rating: 4.1,
    reviewCount: 24,
    inStock: true,
    shopId: 4,
    colors: ["Blue", "Black", "Dark Blue"],
    sizes: ["30", "32", "34", "36", "38", "40"]
  },
  {
    id: 18,
    name: "SATIN EFFECT TOPSTITCHED BALL",
    price: 19.99,
    image: "https://static.zara.net/assets/public/c80b/5a85/34a747f38110/3dcfcac1e6d6/15203610050-e1/15203610050-e1.jpg?ts=1748949489719&w=504",
    category: "Shoes",
    description: "Ultra-comfortable home slippers for relaxation.",
    rating: 4.3,
    reviewCount: 15,
    inStock: true,
    shopId: 4,
    colors: ["Gray", "Brown", "Black", "Blue"],
    sizes: ["36", "37", "38", "39"]
  },

  // Pandora Products (shopId: 5)
  {
    id: 19,
    name: "Sterling Silver Bracelet",
    price: 89.99,
    image: "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwd172a363/productimages/main_rect_base/593853C00_RGB.jpg?q=50&sfrm=png&bgcolor=F7F7F7&sw=1200",
    category: "Accessories",
    description: "Elegant sterling silver bracelet with intricate design.",
    rating: 4.9,
    reviewCount: 17,
    inStock: true,
    shopId: 5,
    colors: ["Silver"],
    sizes: ["16cm", "18cm", "20cm"]
  },
  {
    id: 20,
    name: "Gold Plated Earrings",
    price: 59.99,
    image: "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dw2410dd2a/productimages/main_rect_center/263878C00_RGB.jpg?sw=1200&sh=1200&sm=fit&sfrm=png&bgcolor=F5F5F5",
    category: "Accessories",
    description: "Beautiful gold plated earrings perfect for special occasions.",
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    shopId: 5,
    colors: ["Gold", "Rose Gold"],
    sizes: ["One Size"]
  },
  {
    id: 21,
    name: "Pink Ring",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwef41e253/productimages/main_rect_center/193103C02_RGB.jpg?sw=1200&sh=1200&sm=fit&sfrm=png&bgcolor=F5F5F5",
    category: "Accessories",
    description: "Stunning diamond ring crafted with precision and elegance.",
    rating: 5.0,
    reviewCount: 45,
    inStock: true,
    shopId: 5,
    colors: ["Silver", "Gold"],
    sizes: ["5", "6", "7", "8", "9"]
  },
  {
    id: 22,
    name: "Necklace",
    price: 149.99,
    image: "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dw59f3c286/productimages/main_rect_center/393600C01_RGB.jpg?sw=1200&sh=1200&sm=fit&sfrm=png&bgcolor=F5F5F5",
    category: "Accessories",
    description: "Classic pearl necklace that adds sophistication to any outfit.",
    rating: 4.7,
    reviewCount: 78,
    inStock: true,
    shopId: 5,
    colors: ["White", "Cream"],
    sizes: ["40cm", "45cm", "50cm"]
  },

  // Selfie Products (shopId: 6)
  // {
  //   id: 23,
  //   name: "Trendy Crop Top",
  //   price: 22.99,
  //   image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop",
  //   category: "Women",
  //   description: "Fashionable crop top perfect for young and trendy outfits.",
  //   rating: 4.4,
  //   reviewCount: 178,
  //   inStock: true,
  //   shopId: 6,
  //   colors: ["Pink", "White", "Black", "Yellow"],
  //   sizes: ["XS", "S", "M", "L"]
  // },
  // {
  //   id: 24,
  //   name: "Mini Skirt",
  //   price: 18.99,
  //   image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d1e?w=400&h=400&fit=crop",
  //   category: "Women",
  //   description: "Stylish mini skirt that pairs perfectly with any top.",
  //   rating: 4.2,
  //   reviewCount: 134,
  //   inStock: true,
  //   shopId: 6,
  //   colors: ["Black", "Pink", "White", "Denim"],
  //   sizes: ["XS", "S", "M", "L"]
  // },
  // {
  //   id: 25,
  //   name: "Platform Sneakers",
  //   price: 45.99,
  //   image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
  //   category: "Shoes",
  //   description: "Trendy platform sneakers that add height and style to your look.",
  //   rating: 4.6,
  //   reviewCount: 156,
  //   inStock: true,
  //   shopId: 6,
  //   colors: ["White", "Black", "Pink"],
  //   sizes: ["36", "37", "38", "39", "40"]
  // }
];

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely love this t-shirt! The quality is amazing and it fits perfectly.",
    date: "2024-01-15"
  },
  {
    id: 2,
    productId: 1,
    userName: "Mike Chen",
    rating: 4,
    comment: "Great quality shirt, very comfortable to wear. Definitely recommend!",
    date: "2024-01-10"
  },
  {
    id: 3,
    productId: 2,
    userName: "Emma Davis",
    rating: 5,
    comment: "Perfect blazer for work! Professional look and great fit.",
    date: "2024-01-12"
  }
];
