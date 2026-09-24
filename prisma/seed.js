const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "Crisp Organic Sunflower Shoots",
    tagline: "Nutty, crunchy & rich in complete plant protein",
    description: "Our signature sunflower microgreens are harvested at peak vibrancy. Packed with vitamins A, B-complex, D, and E, plus essential amino acids. Perfect for salads, wraps, and energizing morning smoothies.",
    price: 6.99,
    originalPrice: 8.50,
    category: "Live Microgreens",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    rating: 4.95,
    reviewsCount: 142,
    stock: 45,
    harvestTime: "Harvested Morning of Delivery",
    nutrition: ["Vitamin D", "Plant Protein", "Zinc", "Iron", "Chlorophyll"],
    tasteProfile: "Rich, nutty & pleasant sweet crunch",
    weight: "150g Living Tray",
    featured: true,
    colors: ["#3E6B48", "#88B04B", "#D6C7A1"]
  },
  {
    name: "Red Rambo Spicy Radish Greens",
    tagline: "Vibrant purple stems with a zesty wasabi kick",
    description: "A show-stopping microgreen featuring deep violet and emerald foliage. Contains concentrated sulforaphane, potassium, and antioxidants to naturally invigorate digestion and metabolism.",
    price: 7.49,
    originalPrice: 9.00,
    category: "Live Microgreens",
    image: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?auto=format&fit=crop&w=800&q=80",
    badge: "Promotion",
    rating: 4.88,
    reviewsCount: 98,
    stock: 35,
    harvestTime: "Harvested Daily",
    nutrition: ["Vitamin C", "Sulforaphane", "Anthocyanins", "Folate"],
    tasteProfile: "Peppery, crisp with bold radish spice",
    weight: "120g Living Tray",
    featured: true,
    colors: ["#792B54", "#488858", "#F2E8CF"]
  },
  {
    name: "Broccoli Brassica Super-Shield",
    tagline: "Up to 50x the sulforaphane of mature broccoli",
    description: "Renowned as the most nutrient-dense superfood on earth. Packed with cellular-protective antioxidants, glucoraphanin, and enzymes. Mild flavor that seamlessly blends into any dish.",
    price: 8.99,
    originalPrice: 10.99,
    category: "Live Microgreens",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    badge: "Superfood",
    rating: 4.99,
    reviewsCount: 230,
    stock: 60,
    harvestTime: "Harvested Daily",
    nutrition: ["Sulforaphane 50x", "Vitamin K", "Glucoraphanin", "Magnesium"],
    tasteProfile: "Mild, clean & delicately grassy",
    weight: "150g Living Tray",
    featured: true,
    colors: ["#24452E", "#5B8E5D", "#A3D977"]
  },
  {
    name: "Sweet Tendril Speckled Pea Shoots",
    tagline: "Delicate curly vines loaded with vitamins A & C",
    description: "Bursting with the sweet fresh flavor of garden sweet peas. The delicate curly tendrils add gorgeous texture and gourmet appeal to culinary presentations, stir-fries, and gourmet toasts.",
    price: 6.49,
    originalPrice: 7.99,
    category: "Live Microgreens",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    badge: "Customer favorite",
    rating: 4.92,
    reviewsCount: 115,
    stock: 40,
    harvestTime: "Harvested Daily",
    nutrition: ["Vitamin A", "Vitamin C", "Folic Acid", "Lutein"],
    tasteProfile: "Sweet, juicy & crisp young pea",
    weight: "140g Living Tray",
    featured: true,
    colors: ["#366D44", "#8FB339", "#EFEAD8"]
  },
  {
    name: "Ceramic Minimalist Grow Kit",
    tagline: "Eco-friendly self-watering system for indoor growing",
    description: "Crafted from porous terra-cotta and matte glazed ceramic. Includes 3 organic seed discs, reusable natural hemp grow mats, and a brass mist sprayer. Harvest fresh microgreens in 7 days right on your kitchen counter.",
    price: 34.99,
    originalPrice: 42.00,
    category: "Grow Kits",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    rating: 4.96,
    reviewsCount: 88,
    stock: 25,
    harvestTime: "7 Days from Seed",
    nutrition: ["Zero Waste", "Food-Safe Ceramic", "100% Organic Medium"],
    tasteProfile: "DIY Fresh Harvest Guarantee",
    weight: "Complete Indoor Set",
    featured: true,
    colors: ["#C86446", "#EBE6DC", "#2B5737"]
  },
  {
    name: "Heirloom Mason Sprouting Jar Tower",
    tagline: "Double 32oz jars with 316 stainless steel mesh lids",
    description: "Designed for effortless daily rinsing and ventilation. Comes with solid acacia wood drainage stand, blackout blackout sleeve for early sprouting, and 4 starter seed packs (Alfalfa, Clover, Radish, Broccoli).",
    price: 28.50,
    originalPrice: 35.00,
    category: "Grow Kits",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    rating: 4.87,
    reviewsCount: 76,
    stock: 30,
    harvestTime: "4-6 Days Sprouting Time",
    nutrition: ["BPA-Free", "Stainless Steel 316", "Organic Cotton"],
    tasteProfile: "Ultra-crisp daily sprouts",
    weight: "Twin Jar System",
    featured: false,
    colors: ["#8C7754", "#24452E", "#FAF8F2"]
  },
  {
    name: "Rainbow Superfood Micro-Seeds Vault",
    tagline: "6 Certified organic non-GMO heirloom varieties",
    description: "High germination rate (98%+) seed pack including Broccoli Brassica, Red Coral Radish, Sweet Pea, Black Oil Sunflower, Crimson Kohlrabi, and Italian Genovese Basil. Tested for purity and pathogens.",
    price: 19.99,
    originalPrice: 24.99,
    category: "Organic Seeds",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    badge: "Customer favorite",
    rating: 4.94,
    reviewsCount: 164,
    stock: 75,
    harvestTime: "Up to 30 Full Trays",
    nutrition: ["100% Certified Organic", "Non-GMO Verified", "High Germination"],
    tasteProfile: "Assorted gourmet culinary flavors",
    weight: "500g Resealable Pouch",
    featured: true,
    colors: ["#A8946E", "#366D44", "#C86446"]
  },
  {
    name: "Freeze-Dried Microgreen Super Powder",
    tagline: "Cold-pressed pure microgreen essence with bioavailable enzymes",
    description: "Gently freeze-dried at sub-zero temperatures within 2 hours of harvesting to lock in 99% of active phytonutrients and living chlorophyll. One scoop equals 3 full servings of fresh organic microgreens.",
    price: 39.00,
    originalPrice: 48.00,
    category: "Superfood Blends",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    badge: "Superfood",
    rating: 4.97,
    reviewsCount: 110,
    stock: 45,
    harvestTime: "Cold Freeze-Dried",
    nutrition: ["Chlorophyll", "Antioxidants", "Prebiotics", "Alkalizing"],
    tasteProfile: "Refreshing green tea & earthy hint",
    weight: "200g (30 Servings)",
    featured: true,
    colors: ["#1E3A27", "#8FB339", "#F4F1E8"]
  },
  {
    name: "Amber Glass Botanical Fine Mister",
    tagline: "Continuous ultra-fine fogging for delicate sprouts",
    description: "Heavyweight recycled amber glass with vintage brass nozzle mechanism. Emits a gentle aerosol-like cloud without harsh pressure, ideal for keeping tender roots and cotyledons moist.",
    price: 14.99,
    originalPrice: 18.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    rating: 4.85,
    reviewsCount: 52,
    stock: 50,
    harvestTime: "Precision Care",
    nutrition: ["Recycled Amber Glass", "Pure Brass Pump"],
    tasteProfile: "Essential Tool for Growers",
    weight: "350ml Capacity",
    featured: false,
    colors: ["#A8946E", "#584935", "#366D44"]
  },
  {
    name: "Organic Coconut Coir Grow Mats (Pack of 10)",
    tagline: "100% biodegradable organic substrate for clean indoor farming",
    description: "Sustainably harvested coconut fiber compressed into convenient 10x20 tray pads. Holds optimal moisture-to-air ratio, zero dirt mess, and decomposes naturally into garden compost after harvest.",
    price: 16.50,
    originalPrice: 21.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    badge: "Promotion",
    rating: 4.91,
    reviewsCount: 68,
    stock: 80,
    harvestTime: "Soil-Free Medium",
    nutrition: ["OMRI Listed Organic", "pH Neutral", "Zero Mess"],
    tasteProfile: "Clean substrate",
    weight: "10 Full Size Mats",
    featured: false,
    colors: ["#8C7754", "#D7CBB0", "#1E3A27"]
  }
];

const sampleOrders = [
  {
    orderNumber: "MG-2026-8491",
    customerName: "Elena Rostova",
    customerEmail: "elena.rostova@ecohealth.org",
    customerPhone: "+1 (555) 234-5678",
    shippingAddress: "742 Evergreen Botanical Way, Suite 4B",
    city: "Portland",
    state: "Oregon",
    postalCode: "97201",
    notes: "Please leave on porch if delivery is before 10 AM.",
    status: "Processing",
    paymentMethod: "Credit Card / UPI",
    paymentStatus: "Paid",
    subtotal: 50.97,
    shippingFee: 0,
    discount: 5.00,
    totalAmount: 45.97,
    items: [
      {
        productId: "sample-1",
        productName: "Broccoli Brassica Super-Shield",
        productImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        price: 8.99,
        quantity: 2,
        category: "Live Microgreens"
      },
      {
        productId: "sample-2",
        productName: "Ceramic Minimalist Grow Kit",
        productImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
        price: 34.99,
        quantity: 1,
        category: "Grow Kits"
      }
    ]
  },
  {
    orderNumber: "MG-2026-8492",
    customerName: "Marcus Vance",
    customerEmail: "marcus.vance@culinarygreen.com",
    customerPhone: "+1 (555) 876-1234",
    shippingAddress: "1280 Farmstead Boulevard, Apt 12",
    city: "Seattle",
    state: "Washington",
    postalCode: "98104",
    notes: "Chef order for weekend tasting menu.",
    status: "Order Picked",
    paymentMethod: "Online Payment",
    paymentStatus: "Paid",
    subtotal: 58.45,
    shippingFee: 0,
    discount: 0,
    totalAmount: 58.45,
    items: [
      {
        productId: "sample-3",
        productName: "Crisp Organic Sunflower Shoots",
        productImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        price: 6.99,
        quantity: 3,
        category: "Live Microgreens"
      },
      {
        productId: "sample-4",
        productName: "Red Rambo Spicy Radish Greens",
        productImage: "https://images.unsplash.com/photo-1533450718592-29d45635f0a9?auto=format&fit=crop&w=800&q=80",
        price: 7.49,
        quantity: 5,
        category: "Live Microgreens"
      }
    ]
  },
  {
    orderNumber: "MG-2026-8493",
    customerName: "Sophia Chen",
    customerEmail: "sophia.chen@wellnessdaily.io",
    customerPhone: "+1 (555) 901-4433",
    shippingAddress: "55 Lotus Garden Terrace",
    city: "San Francisco",
    state: "California",
    postalCode: "94107",
    notes: "Eco-packaging requested.",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    subtotal: 39.00,
    shippingFee: 4.99,
    discount: 0,
    totalAmount: 43.99,
    items: [
      {
        productId: "sample-5",
        productName: "Freeze-Dried Microgreen Super Powder",
        productImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
        price: 39.00,
        quantity: 1,
        category: "Superfood Blends"
      }
    ]
  }
];

async function main() {
  console.log('🌱 Clearing existing collections...');
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('🌿 Seeding fresh Microgreen products...');
  for (const item of sampleProducts) {
    await prisma.product.create({
      data: item
    });
  }

  console.log('📦 Seeding customer orders...');
  for (const order of sampleOrders) {
    await prisma.order.create({
      data: order
    });
  }

  console.log('✅ Microgreen database successfully seeded with rich products and initial orders!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
