const CARS = [
  {
    id:1, brand:"Toyota", name:"Land Cruiser Prado",
    price:65000000, cats:["suv","luxury"], year:2024,
    engine:"2.8L Turbo Diesel", hp:"201 hp", topSpeed:"175 km/h", range:"–",
    badge:"popular",
    desc:"The legendary Prado combines rugged off-road capability with premium comfort, making it the ultimate status symbol on Pakistani roads.",
    img:"https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80"
  },
  {
    id:2, brand:"Toyota", name:"Fortuner Legender",
    price:18000000, cats:["suv"], year:2024,
    engine:"2.8L Diesel", hp:"201 hp", topSpeed:"180 km/h", range:"–",
    badge:"popular",
    desc:"A dominant force in the local SUV market, the Fortuner Legender offers aggressive styling, robust performance, and excellent resale value.",
    img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"
  },
  {
    id:3, brand:"Tesla", name:"Model S Plaid",
    price:25197200, cats:["electric"], year:2024,
    engine:"Tri-Motor EV", hp:"1020 hp", topSpeed:"200 mph", range:"396 mi",
    badge:"",
    desc:"The quickest production car ever made. 0-60 in under 2 seconds, 396-mile range, and a stunning interior that redefined the EV segment entirely.",
    img:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
  },
  {
    id:4, brand:"Tesla", name:"Model X Plaid",
    price:30797200, cats:["electric","suv"], year:2024,
    engine:"Tri-Motor EV", hp:"1020 hp", topSpeed:"163 mph", range:"333 mi",
    badge:"",
    desc:"The Model X combines iconic falcon-wing doors, seating for seven, and Plaid-level acceleration in the most advanced electric SUV ever made.",
    img:"https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"
  },
  {
    id:5, brand:"Porsche", name:"911 Carrera",
    price:32200000, cats:["sports"], year:2024,
    engine:"Flat-6 Turbo", hp:"379 hp", topSpeed:"182 mph", range:"–",
    badge:"popular",
    desc:"The gold standard for sports cars. Refined, thrilling, and utterly usable every day — the 911 has defined driving pleasure for over five decades.",
    img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
  },
  {
    id:6, brand:"BMW", name:"M5 Competition",
    price:31610600, cats:["luxury"], year:2023,
    engine:"V8 Twin-Turbo", hp:"617 hp", topSpeed:"190 mph", range:"–",
    badge:"",
    desc:"The ultimate high-performance sedan — combining everyday luxury with supercar-rivalling acceleration and surgical German engineering.",
    img:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
  },
  {
    id:7, brand:"Range Rover", name:"Sport SVR",
    price:35980000, cats:["suv","luxury"], year:2024,
    engine:"V8 Supercharged", hp:"575 hp", topSpeed:"176 mph", range:"–",
    badge:"new",
    desc:"The Sport SVR blends opulent luxury with raw power — a 575hp V8 SUV that sets track records while wrapping you in hand-stitched leather.",
    img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"
  },
  {
    id:8, brand:"Honda", name:"Civic RS",
    price:9900000, cats:["sports","luxury"], year:2024,
    engine:"1.5L Turbo", hp:"176 hp", topSpeed:"220 km/h", range:"–",
    badge:"new",
    desc:"The Civic RS brings sporty driving dynamics, a sleek fastback profile, and advanced Honda Sensing safety features to the premium sedan segment.",
    img:"https://images.unsplash.com/photo-1605816988069-b11383b50717?w=800&q=80"
  },
  {
    id:9, brand:"Hyundai", name:"Tucson AWD",
    price:8900000, cats:["suv"], year:2024,
    engine:"2.0L Petrol", hp:"155 hp", topSpeed:"190 km/h", range:"–",
    badge:"",
    desc:"A popular compact crossover featuring a striking geometric grille, spacious interior, and smooth ride quality for urban adventures.",
    img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80"
  },
  {
    id:10, brand:"Audi", name:"RS7 Sportback",
    price:34006000, cats:["luxury"], year:2024,
    engine:"V8 Biturbo", hp:"591 hp", topSpeed:"190 mph", range:"–",
    badge:"new",
    desc:"The Audi RS7 Sportback is effortless style and brutal power — 591hp, all-wheel drive, and a silhouette that stops traffic wherever it goes.",
    img:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"
  },
  {
    id:11, brand:"Haval", name:"H6 HEV",
    price:11800000, cats:["electric","suv"], year:2024,
    engine:"1.5L Hybrid", hp:"240 hp", topSpeed:"200 km/h", range:"1000+ km",
    badge:"new",
    desc:"A smart hybrid SUV offering incredible fuel efficiency, futuristic tech, and massive combined power output for an unmatched driving experience.",
    img:"https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"
  },
  {
    id:12, brand:"Kia", name:"Sportage AWD",
    price:8800000, cats:["suv"], year:2024,
    engine:"2.0L Petrol", hp:"155 hp", topSpeed:"185 km/h", range:"–",
    badge:"",
    desc:"The vehicle that revolutionized the local crossover market. The Sportage remains a favourite for its bold design and reliable performance.",
    img:"https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80"
  }
];
