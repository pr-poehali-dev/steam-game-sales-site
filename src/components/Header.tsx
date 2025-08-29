import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface HeaderProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
}

const Header = ({
  cart,
  isCartOpen,
  setIsCartOpen,
  removeFromCart,
  updateQuantity,
  getTotalPrice
}: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold gradient-text">SteamKeys Store</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#new" className="hover:text-primary transition-colors">Новинки</a>
              <a href="#sales" className="hover:text-primary transition-colors">Скидки</a>
              <a href="#genres" className="hover:text-primary transition-colors">Жанры</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#support" className="hover:text-primary transition-colors">Поддержка</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? "Ваша корзина пуста" : `${cart.length} товар(ов) в корзине`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-sm text-primary font-bold">{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={12} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">₽{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <Button className="w-full" size="lg">
                      <Icon name="CreditCard" className="mr-2" size={20} />
                      Оформить заказ
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      После оплаты Steam-ключи будут отправлены автоматически
                    </p>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;