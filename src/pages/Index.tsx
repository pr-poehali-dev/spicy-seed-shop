import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [cart, setCart] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);
  const [heatFilter, setHeatFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const peppers = [
    {
      id: 1,
      name: "Carolina Reaper",
      scoville: 2200000,
      price: 350,
      description: "Самый острый перец в мире",
      image: "/img/617745ea-041a-4596-989e-e8954f91bd4c.jpg",
    },
    {
      id: 2,
      name: "Ghost Pepper",
      scoville: 1000000,
      price: 280,
      description: "Легендарный индийский перец",
      image: "/img/86e42a98-8e52-4711-9e6a-3ed6d25ad03f.jpg",
    },
    {
      id: 3,
      name: "Habanero Orange",
      scoville: 350000,
      price: 190,
      description: "Фруктовый вкус с огненной остротой",
      image: "/img/86e42a98-8e52-4711-9e6a-3ed6d25ad03f.jpg",
    },
    {
      id: 4,
      name: "Jalapeño",
      scoville: 8000,
      price: 120,
      description: "Классический мексиканский перец",
      image: "/img/86e42a98-8e52-4711-9e6a-3ed6d25ad03f.jpg",
    },
    {
      id: 5,
      name: "Scorpion Pepper",
      scoville: 1500000,
      price: 320,
      description: "Жгучий как жало скорпиона",
      image: "/img/617745ea-041a-4596-989e-e8954f91bd4c.jpg",
    },
    {
      id: 6,
      name: "Cayenne",
      scoville: 50000,
      price: 150,
      description: "Идеален для приправ",
      image: "/img/86e42a98-8e52-4711-9e6a-3ed6d25ad03f.jpg",
    },
  ];

  const getHeatLevel = (scoville: number) => {
    if (scoville < 10000)
      return { level: "mild", color: "bg-green-500", text: "Мягкий" };
    if (scoville < 100000)
      return { level: "medium", color: "bg-yellow-500", text: "Средний" };
    if (scoville < 500000)
      return { level: "hot", color: "bg-orange-500", text: "Острый" };
    if (scoville < 1000000)
      return { level: "very-hot", color: "bg-red-500", text: "Очень острый" };
    return { level: "extreme", color: "bg-red-900", text: "Экстремальный" };
  };

  const filteredPeppers = peppers.filter((pepper) => {
    const matchesSearch = pepper.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      heatFilter === "all" ||
      getHeatLevel(pepper.scoville).level === heatFilter;
    return matchesSearch && matchesFilter;
  });

  const addToCart = (pepper: (typeof peppers)[0]) => {
    const existingItem = cart.find((item) => item.id === pepper.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === pepper.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        { id: pepper.id, name: pepper.name, price: pepper.price, quantity: 1 },
      ]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🌶️</div>
              <div>
                <h1 className="text-3xl font-bold font-montserrat">
                  ХОРНИ SEED
                </h1>
                <p className="text-red-100 font-open-sans">
                  Семена острых перцев • 700+ сортов
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-red-700">
                <Icon name="User" className="mr-2 h-4 w-4" />
                Вход
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-red-700 relative"
              >
                <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                Корзина
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold mb-6 font-montserrat animate-pulse">
            🔥 ОГНЕННАЯ КОЛЛЕКЦИЯ 🔥
          </h2>
          <p className="text-xl mb-8 font-open-sans max-w-2xl mx-auto">
            Более 700 сортов семян острых перцев от мягких до экстремально
            жгучих. От 1,000 до 2,200,000 единиц по шкале Сковилла!
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
            >
              <Icon name="Flame" className="mr-2 h-5 w-5" />
              Каталог перцев
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              <Icon name="BookOpen" className="mr-2 h-5 w-5" />
              Гид по выращиванию
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="catalog">🌶️ Каталог</TabsTrigger>
            <TabsTrigger value="cart">🛒 Корзина ({cart.length})</TabsTrigger>
            <TabsTrigger value="contacts">📞 Контакты</TabsTrigger>
            <TabsTrigger value="delivery">🚚 Доставка</TabsTrigger>
            <TabsTrigger value="blog">📖 Блог</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Поиск по названию перца..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select value={heatFilter} onValueChange={setHeatFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Фильтр по остроте" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все уровни остроты</SelectItem>
                    <SelectItem value="mild">🟢 Мягкий (до 10K)</SelectItem>
                    <SelectItem value="medium">
                      🟡 Средний (10K-100K)
                    </SelectItem>
                    <SelectItem value="hot">🟠 Острый (100K-500K)</SelectItem>
                    <SelectItem value="very-hot">
                      🔴 Очень острый (500K-1M)
                    </SelectItem>
                    <SelectItem value="extreme">
                      🔥 Экстремальный (1M+)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeppers.map((pepper) => {
                const heatLevel = getHeatLevel(pepper.scoville);
                return (
                  <Card
                    key={pepper.id}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-red-300"
                  >
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={pepper.image}
                          alt={pepper.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge
                          className={`absolute top-3 right-3 ${heatLevel.color} text-white`}
                        >
                          {heatLevel.text}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2 font-montserrat">
                        {pepper.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mb-3 font-open-sans">
                        {pepper.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-500">
                          <Icon name="Flame" className="inline h-4 w-4 mr-1" />
                          {pepper.scoville.toLocaleString()} SHU
                        </div>
                        <div className="text-xl font-bold text-red-600">
                          {pepper.price}₽
                        </div>
                      </div>
                      <Button
                        onClick={() => addToCart(pepper)}
                        className="w-full bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />В
                        корзину
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="ShoppingCart" className="mr-2" />
                  Корзина ({cart.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  )}{" "}
                  товаров)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Icon
                      name="ShoppingCart"
                      className="mx-auto h-12 w-12 mb-4"
                    />
                    <p>Корзина пуста</p>
                    <p className="text-sm">
                      Добавьте семена перцев из каталога
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Количество: {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-lg font-bold">
                            {item.price * item.quantity}₽
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold">Итого:</span>
                        <span className="text-2xl font-bold text-red-600">
                          {getTotalPrice()}₽
                        </span>
                      </div>
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700"
                        size="lg"
                      >
                        <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>📞 Контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Icon name="Phone" className="mr-2" />
                      Телефон
                    </h3>
                    <p className="text-gray-600">+7 (999) 123-45-67</p>
                    <p className="text-gray-600">Пн-Пт: 9:00-18:00</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Icon name="Mail" className="mr-2" />
                      Email
                    </h3>
                    <p className="text-gray-600">info@horniSeed.ru</p>
                    <p className="text-gray-600">support@horniSeed.ru</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Icon name="MapPin" className="mr-2" />
                    Адрес
                  </h3>
                  <p className="text-gray-600">
                    г. Москва, ул. Перцовая, д. 42
                  </p>
                  <p className="text-gray-600">Теплично-семенной комплекс</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <CardTitle>🚚 Доставка и оплата</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">
                      🚚 Доставка
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Почта России - от 200₽</li>
                      <li>• СДЭК - от 300₽</li>
                      <li>• Курьер по Москве - 400₽</li>
                      <li>• Самовывоз - бесплатно</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-red-600">
                      💳 Оплата
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Банковские карты</li>
                      <li>• СБП (Система быстрых платежей)</li>
                      <li>• Наложенный платеж</li>
                      <li>• Яндекс.Деньги</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    ⚠️ Важно!
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    Семена острых перцев требуют особых условий хранения. Мы
                    упаковываем их в специальные пакеты с защитой от влаги.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>📖 Блог о выращивании</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-red-500">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        🌱 Как вырастить Carolina Reaper?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-3">
                        Полное руководство по выращиванию самого острого перца в
                        мире.
                      </p>
                      <Button variant="outline" size="sm">
                        Читать статью
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-orange-500">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        🌡️ Шкала Сковилла: гид по остроте
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-3">
                        Узнайте, как измеряется острота перцев и что означают
                        единицы SHU.
                      </p>
                      <Button variant="outline" size="sm">
                        Читать статью
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-red-400">ХОРНИ SEED</h3>
              <p className="text-gray-400 text-sm">
                Специализируемся на семенах острых перцев уже 10 лет. Более 700
                сортов со всего мира.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-red-400">
                    Каталог
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400">
                    Доставка
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400">
                    Гарантии
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400">
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📞 +7 (999) 123-45-67</li>
                <li>✉️ info@horniSeed.ru</li>
                <li>🕒 Пн-Пт: 9:00-18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ХОРНИ SEED. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
