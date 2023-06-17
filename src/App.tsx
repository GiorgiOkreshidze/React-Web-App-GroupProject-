import React, { useEffect, useState } from "react";
import {
  fetchModels,
  fetchManufacturers,
  fetchCategories,
  fetchData,
  fetchPageData,
  Manufacturer,
  Model,
  Category,
  Item,
  Page,
  versioning,
  Endpoint,
  CarsData,
  Meta,
} from "./dataService";
import "./App.css";
import Container from "./container";
import Products from "./Products";

function App() {
  const [models, setModels] = useState<Model[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Item[]>([]);
  const [page, setPage] = useState<Page | null>(null);
  const [currency, setCurrency] = useState("none");

  useEffect(() => {
    fetchManufacturerModelsAndDisplay();
    fetchManufacturersAndDisplay();
    fetchCategoriesAndDisplay();
    fetchProductsAndDisplay();
    fetchPageAndDisplay();
  }, []);

  function fetchPageAndDisplay() {
    const page = 2; // Change the page number as needed
    fetchPageData(page)
      .then((fetchedPage) => {
        setPage(fetchedPage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchManufacturerModelsAndDisplay() {
    const manufacturerId = "10"; // Example manufacturer ID

    fetchModels(manufacturerId)
      .then((models) => {
        setModels(models);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchManufacturersAndDisplay() {
    fetchManufacturers()
      .then((manufacturers) => {
        setManufacturers(manufacturers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchCategoriesAndDisplay() {
    fetchCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function fetchProductsAndDisplay() {
    const searchParams = {}; // Add any necessary search parameters
    fetchData(searchParams)
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const filterCarsByHours = (event: React.MouseEvent<HTMLSelectElement>) => {
    const selectedHour = parseInt(event.currentTarget.value);

    if (selectedHour === 0) {
      setProducts([...products]); // Reset to original list if "All" option is selected
    } else {
      const filteredCars = products.filter((car) => {
        const carPublishedTime = new Date(car.order_date);
        const currentTime = new Date();
        const diffInHours =
          (currentTime.getTime() - carPublishedTime.getTime()) /
          (1000 * 60 * 60);
        return diffInHours <= selectedHour;
      });

      setProducts(filteredCars);
    }
  };

  const sortCars = (event: React.MouseEvent<HTMLSelectElement>) => {
    const product = event.currentTarget.value;
    const sortedCars = [...products]; //we are creating copies of the products

    switch (product) {
      case "2.1":
        sortedCars.sort((a, b) => a.prod_year - b.prod_year);
        break;
      case "1.1":
        sortedCars.sort((a, b) => b.prod_year - a.prod_year);
        break;
      case "4.1":
        sortedCars.sort((a, b) => a.price - b.price);
        break;
      case "3.1":
        sortedCars.sort((a, b) => b.price - a.price);
        break;
      case "6.1":
        sortedCars.sort((a, b) => a.car_run - b.car_run);
        break;
      case "5.1":
        sortedCars.sort((a, b) => b.car_run - a.car_run);
        break;
      default:
        return;
    }

    setProducts(sortedCars);
  };
  const handleClick = () => {
    window.location.href = "/ka/";
  };

  const toggleVisibility = () =>
    setCurrency((value) => (value === "none" ? "block" : "none"));

  return (
    <div id="app">
      <div className="app-wraper">
        <header className="header shadow-sm position-sticky top-0 left-0 w-100 z-index-1111 mb-16px mb-md-20px box-shadow-none box-shadow-sm-sm">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between h-80px px-16px px-md-0">
              <div className="myautologo d-flex align-items-center justify-content-between justify-content-sm-start w-100 w-md-auto">
                <button className="logo" onClick={handleClick}></button>
              </div>
            </div>
          </div>
        </header>

        <div className="app-content " style={{ backgroundColor: "#E5E5E5" }}>
          <div className="container">
            <div className="d-flex align-items-center justify-content-between py-0 pt-md-16 pb-md-24px px-20px px-md-0">
              <div className="d-flex align-items-center">
                <a
                  className="d-flex align-items-center text-gray-850 hover-text-gray-800 font-size-12 cursor-pointer"
                  href="/ka/"
                >
                  მთავარი
                  <span className="d-flex mx-6px ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="8"
                      viewBox="0 0 4.414 6.826"
                    >
                      <path
                        d="M0,4,2,2,0,0"
                        transform="translate(1.414 1.414)"
                      ></path>
                    </svg>
                  </span>
                </a>
              </div>

              <span className="d-flex align-items-center text-gray-850 font-size-12 cursor-default"></span>
            </div>

            <div className="d-flex justify-content-between">
              <Container onclick={toggleVisibility} />
              <Products currency={currency} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
