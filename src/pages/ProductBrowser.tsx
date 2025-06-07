
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductBrowser = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: "dining-table", name: "Dining Table", category: "Furniture", image: "🪑", maker: "Rajesh Kumar", price: "₹45,000", rating: 4.9 },
    { id: "ceramic-vase", name: "Ceramic Vase", category: "Pottery", image: "🏺", maker: "Priya Sharma", price: "₹3,500", rating: 4.8 },
    { id: "silk-scarf", name: "Silk Scarf", category: "Textile", image: "🧣", maker: "Kumar Singh", price: "₹2,800", rating: 4.7 },
    { id: "copper-bowl", name: "Copper Bowl", category: "Metalwork", image: "🥣", maker: "Arjun Patel", price: "₹4,200", rating: 4.9 },
    { id: "leather-bag", name: "Leather Bag", category: "Leatherwork", image: "🧳", maker: "Meera Joshi", price: "₹6,500", rating: 4.8 },
    { id: "bamboo-basket", name: "Bamboo Basket", category: "Basketry", image: "🧺", maker: "Ravi Gupta", price: "₹1,500", rating: 4.6 }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedProduct) {
      const product = products.find(p => p.id === selectedProduct);
      navigate('/collaborate/form', { 
        state: { selectedProduct: product } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-lg font-semibold">Product Browser</h1>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
            Explore Existing Work
          </h1>
          <p className="text-xl text-muted-foreground">
            Find inspiration from beautiful handcrafted pieces
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline" size="lg" className="px-6">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className={`bg-card rounded-3xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedProduct === product.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{product.image}</div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {product.category}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">By {product.maker}</span>
                  <span className="text-sm">⭐ {product.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground">Custom order</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedProduct}
            size="lg"
            className="h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg disabled:opacity-30"
          >
            Request Similar Piece
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProductBrowser;
