import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getCategoryById,
  getManufacturerById,
  getModelById,
  fetchModels,
  fetchManufacturers,
  fetchCategories,
  fetchData,
  Manufacturer,
  Model,
  Category,
  Item,
} from "./dataService";
import "./App.css";

function Products() {
  const [models, setModels] = useState<Model[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Item[]>([]);
  const [like, setLike] = useState<string | null>(null);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetchManufacturerModelsAndDisplay();
    fetchManufacturersAndDisplay();
    fetchCategoriesAndDisplay();
    fetchProductsAndDisplay();
  }, []);

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
        setProductCount(products.length); // Update the product count
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
    const sortedCars = [...products]; // Create a copy of the products array

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

  const getTimePassed = (product: Item) => {
    const orderDate = new Date(product.order_date);
    const currentDate = new Date();

    const timeDiff = Math.floor(
      (currentDate.getTime() - orderDate.getTime()) / (1000 * 60)
    );

    return `${timeDiff} წუთის წინ`;
  };
  // დავამატე რამდენი ხნის წინ დაიდო მანქანა.

  // ლაიქი გასასწორებელია. არ მუშაობს სწორად.
  const likeClick = (buttonName: string) => {
    setLike(like);
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.68574 2.1679C8.51267 2.29346 8.3477 2.43458 8.19095 2.5894L8.0626 2.72088L8 2.78989L7.9374 2.72088L7.80905 2.5894C7.6523 2.43458 7.48733 2.29346 7.31426 2.1679C6.73288 1.74614 6.06008 1.5 5.3 1.5C2.58473 1.5 1 3.87655 1 6.304C1 8.67851 2.19139 10.7406 4.13701 12.4002C5.50533 13.5673 7.2954 14.5 8 14.5C8.705 14.5 10.495 13.5674 11.8633 12.4002C13.8088 10.7406 15 8.67852 15 6.304C15 3.87655 13.4153 1.5 10.7 1.5C9.93992 1.5 9.26711 1.74614 8.68574 2.1679Z"
      fill="red"
    ></path>;
  };

  function ProductModelName({ product }: { product: Item }) {
    const [modelName, setModelName] = useState<string | undefined>(undefined);

    useEffect(() => {
      async function fetchModelName() {
        try {
          const models = await fetchModels(product.man_id.toString());
          const modelName = getModelById(models, product.model_id)?.model_name;
          setModelName(modelName);
        } catch (error) {
          console.error(error);
          // Handle error if necessary
        }
      }

      fetchModelName();
    }, [product.man_id, product.model_id]);

    return (
      <div
        style={{
          height: "17px",
          fontFamily: "Helvetica Neue LT GEO",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "17px",
          lineHeight: "1.2",
          flex: "none",
          order: "1",
          flexGrow: "0",
          marginLeft: "5px",
        }}
      >
        {modelName}
      </div>
    );
  }

  return (
    <div className="search-content">
      {/* <script
        defer
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      ></script>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      ></link> */}

      <div className="d-flex justify-content-between align-items-center my-12px mt-md-0 mb-md-16px px-16px px-md-0">
        <span className="d-flex font-size-12 font-size-md-14 font-size-m-16 text-gray-800 text-nowrap">
          {productCount} განცხადება
        </span>
        <div className="d-flex align-items-center">
          <select
            className="d-flex align-items-center position-relative ml-4px ml-md-8px undefined"
            style={{
              // boxSizing: "border-box",
              // flexDirection: "row",
              // justifyContent: "space-between",
              padding: "8px 8px 8px 12px",
              gap: "4px",
              width: "124px",
              background: "#FFFFFF",
              border: "1px solid #E9E9F0",
              borderRadius: "8px",
            }}
            onClick={filterCarsByHours}
          >
            <option value="0">პერიოდი</option>
            <option value="1">1 საათი</option>
            <option value="2">2 საათი</option>
            <option value="3">3 საათი</option>
            <option value="24">1 დღე</option>
            <option value="48">2 დღე</option>
            <option value="72">3 დღე</option>
            <option value="168">1 კვირა</option>
            <option value="336">2 კვირა</option>
            <option value="504">3 კვირა</option>
          </select>

          <select
            className="d-flex align-items-center position-relative ml-4px ml-md-8px undefined"
            onClick={sortCars}
            style={{
              // boxSizing: "border-box",
              // flexDirection: "row",
              // justifyContent: "space-between",
              padding: "8px 8px 8px 12px",
              gap: "4px",
              width: "184.883px",
              height: "40px",
              top: "0px",
              background: "#FFFFFF",
              border: "1px solid #E9E9F0",
              borderRadius: "8px",
            }}
          >
            <option value="1.1">თარიღი კლებადი</option>
            <option value="2.1">თარიღი ზრდადი</option>
            <option value="3.1">ფასი კლებადი</option>
            <option value="4.1">ფასი ზრდადი</option>
            <option value="5.1">გარბენი კლებადი</option>
            <option value="6.1">გარბენი ზრდადი</option>
          </select>
        </div>
      </div>

      {products.map((product) => (
        <div className="product px-16px px-md-0 position-relative">
          <div className="rounded mb-10px bg-white" /*mb-10px*/>
            <div
              className="photoAndInfo d-flex flex-column flex-m-row p-m-16px" /*p-md-16px*/
            >
              <div className="d-flex d-m-none justify-content-between align-items-center py-12px px-16px">
                <div className="d-flex align-items-center font-size-12 text-gray-500 text-nowrap">
                  რუსთავი
                </div>
                <div className="font-size-12 text-green-250 d-flex align-items-center">
                  <span className="d-flex mr-4px">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="7.258"
                      height="5.927"
                      viewBox="0 0 7.258 5.927"
                    >
                      <g transform="translate(0.131 0.127)">
                        <g transform="translate(-227 -865)">
                          <g transform="translate(0 808)">
                            <g transform="translate(219 48)">
                              <path
                                d="M9,12.286,10.667,14,14,10"
                                style={{
                                  fill: "none",
                                  stroke: "rgb(2, 204, 89)",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "1.6px",
                                  fillRule: "evenodd",
                                }}
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  განბაჟებული
                </div>
              </div>
              {/* განუბაჟებლის გამოტანა 
               <div className="font-size-12 text-green-250 d-flex align-items-center">
                        <div className="font-size-12 text-red-800 text-nowrap">
                          განბაჟება&nbsp;
                          <div
                            className="d-inline-flex align-items-center icon-red-800 icon-w-2"
                          >
                            1000
                            <span className="d-flex ml-8px">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8px"
                                height="9px"
                                viewBox="0 0 10 11"
                              >
                                <path
                                  id="GEL"
                                  d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z"
                                  transform="translate(-305 29)"
                                  fill="#FF3B30"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div> */}

              <div
                className="photo flex-shrink-0 w-m-200px mb-12px mb-m-0 px-16px px-m-0"
                // /* mb-12px mb-m-0 px-16px px-m-0*/ style={{
                //   // backgroundImage: `url(${product.photo})`,
                //   // backgroundSize: "cover",
                //   // backgroundPosition: "center",
                //   // marginRight: "20px",
                //   // // height: "170px",
                //   // // width: "182px",
                //   // left: "-4px",
                //   // top: "-3px",
                //   borderRadius: "8px",
                // }}
              >
                <div className="ratio-4-3 w-100">
                  <img
                    className="items__image"
                    src={"" + product.photo}
                    alt=""
                  ></img>
                </div>
              </div>

              <div
                className="info pl-m-14px d-flex flex-column justify-content-between w-100 h-m-150px" /*pl-m-14px*/
              >
                <div
                  className="d-flex flex-column flex-lg-row align-items-start justify-content-between mb-lg-12px px-16px px-m-0" /*mb-lg-12px px-16px*/
                >
                  <div className="d-flex align-items-center">
                    <h2 className="d-flex font-medium text-gray-800 font-size-14">
                      <span
                        className="text-gray-800"
                        // style={{
                        //   fontFamily: "Helvetica Neue LT GEO",
                        //   fontStyle: "normal",
                        //   fontWeight: "500",
                        //   fontSize: "25px",
                        //   lineHeight: "17px",
                        //   color: "#272A37",
                        // }}
                      >
                        {
                          getManufacturerById(manufacturers, product.man_id)
                            ?.man_name
                        }
                        {getModelById(models, product.model_id)?.model_name}
                        &nbsp;&nbsp;
                      </span>
                      <span
                        className="ml-8px d-flex text-gray-500 font-medium text-nowrap"
                        // /*ml-8px*/ style={{
                        //   width: "44px",
                        //   height: "17px",
                        //   fontFamily: "Helvetica Neue LT GEO",
                        //   fontStyle: "normal",
                        //   fontWeight: "500",
                        //   fontSize: "25px",
                        //   lineHeight: "17px",
                        //   color: "#8C929B",
                        //   flex: "none",
                        //   order: "1",
                        //   flexGrow: "0",
                        // }}
                      >
                        {product.prod_year}&nbsp;წ
                      </span>
                    </h2>
                  </div>

                  <div
                    className="d-none d-m-flex align-items-center mt-m-8px mt-lg-0"
                    // /*mt-m-8px*/ style={{
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   width: "200px",
                    //   fontFamily: "TBC Sailec",
                    //   fontStyle: "normal",
                    //   fontWeight: "500",
                    //   // fontSize: '11px',
                    //   color: "#FF3B30",
                    // }}
                  >
                    <div
                      className="ml-lg-16px mr-24px"
                      /*ml-lg-16px mr-24px*/
                    >
                      <div className="font-size-12 text-green-250 d-flex align-items-center">
                        <span className="d-flex mr-4px">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="7.258"
                            height="5.927"
                            viewBox="0 0 7.258 5.927"
                          >
                            <g transform="translate(0.131 0.127)">
                              <g transform="translate(-227 -865)">
                                <g transform="translate(0 808)">
                                  <g transform="translate(219 48)">
                                    <path
                                      d="M9,12.286,10.667,14,14,10"
                                      style={{
                                        fill: "none",
                                        stroke: "rgb(2, 204, 89)",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "1.6px",
                                        fillRule: "evenodd",
                                      }}
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </span>
                        განბაჟებული
                      </div>
                      {/* განუბაჟებლის გამოტანა 
                       <div className="font-size-12 text-green-250 d-flex align-items-center">
                        <div className="font-size-12 text-red-800 text-nowrap">
                          განბაჟება&nbsp;
                          <div
                            className="d-inline-flex align-items-center icon-red-800 icon-w-2"
                          >
                            1000
                            <span className="d-flex ml-8px">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8px"
                                height="9px"
                                viewBox="0 0 10 11"
                              >
                                <path
                                  id="GEL"
                                  d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z"
                                  transform="translate(-305 29)"
                                  fill="#FF3B30"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div
                      className="d-flex align-items-center font-size-12 text-gray-500 text-nowrap"
                      // style={{
                      //   width: "95px",
                      //   height: "14px",
                      //   fontFamily: "Helvetica",
                      //   fontStyle: "normal",
                      //   fontWeight: "400",
                      //   // fontSize: '12px',
                      //   lineHeight: "14px",
                      //   color: "#6F7383",
                      //   flex: "none",
                      //   order: "1",
                      //   flexGrow: "0",
                      // }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-3 h-3"
                        /*w-24px h-24px*/ style={{
                          width: "13px",
                          height: "13px",
                        }}
                      >
                        <mask id="a">
                          <circle
                            cx="256"
                            cy="256"
                            r="256"
                            fill="#fff"
                          ></circle>
                        </mask>
                        <g mask="url(#a)">
                          <path
                            fill="#fff"
                            d="M0 0h222.6l31 23.4L289.4 0H512v222.6l-21.5 31 21.5 35.8V512H289.4l-34.2-20.5-32.6 20.5H0V289.4l22.7-32.6L0 222.6z"
                          ></path>
                          <path
                            fill="#d80027"
                            d="M222.6 0v222.6H0v66.8h222.6V512h66.8V289.4H512v-66.8H289.4V0z"
                          ></path>
                          <path
                            fill="#d80027"
                            d="M155.8 122.4V89h-33.4v33.4H89v33.4h33.4v33.4h33.4v-33.4h33.4v-33.4zm233.8 0V89h-33.4v33.4h-33.4v33.4h33.4v33.4h33.4v-33.4H423v-33.4zM155.8 356.2v-33.4h-33.4v33.4H89v33.4h33.4V423h33.4v-33.4h33.4v-33.4zm233.8 0v-33.4h-33.4v33.4h-33.4v33.4h33.4V423h33.4v-33.4H423v-33.4z"
                          ></path>
                        </g>
                      </svg>
                      &nbsp;ადგილი
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-m-row justify-content-between">
                  <div
                    className="d-block d-m-none d-lg-block w-lg-70 border-radius-8 border-solid-1 border-solid-m-0 
                          px-12px p-m-0 mx-16px mx-m-0 mt-8px mt-m-0 border-gray-100"
                    /*px-12px p-m-0 mx-16px mx-m-0 mt-8px mt-m-0*/
                  >
                    <div
                      className="row justify-content-between justify-content-md-start mx-n8px mx-md-n12px my-m-n10px" /*mx-n8px mx-md-n12px my-m-n10px*/
                    >
                      <div
                        className="w-50 px-8px px-md-12px py-10px mb-10px " /*px-8px px-md-12px py-10px mb-10px*/
                      >
                        <div
                          className="d-flex align-item-center font-size-12 font-size-md-13 text-gray-800"
                          // style={{
                          //   fontFamily: "TBC Sailec",
                          //   fontStyle: "normal",
                          //   fontWeight: "500",
                          //   // fontSize: '12px',
                          //   color: "#1B1D25",
                          // }}
                        >
                          <span
                            className="d-flex mr-8px mr-md-12px" /*mr-8px mr-md-12px*/
                          >
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.525 2c-.388 0-.703.35-.703.783 0 .433.315.783.703.783h1.808v1.707H5.686a.662.662 0 0 0-.465.19L4.004 6.665h-.667a.654.654 0 0 0-.658.65v1.23H1.5V7.134a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v4.95c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-1.998H2.68v1.871c0 .36.294.65.658.65h.667l1.217 1.203c.124.121.29.19.465.19h5.17c.142 0 .28-.046.395-.13l1.88-1.393a.648.648 0 0 0 .263-.52v-1.871H14.5v1.998c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-4.95a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v1.411h-1.106v-1.23a.646.646 0 0 0-.193-.46l-1.41-1.392a.662.662 0 0 0-.465-.19H8.74V3.566h1.807c.389 0 .704-.35.704-.783 0-.432-.315-.783-.704-.783H5.525zm-.783 5.775 1.217-1.202h5.094l1.025 1.011v4.049L10.637 12.7H5.959l-1.217-1.202a.662.662 0 0 0-.465-.19h-.282V7.964h.282a.662.662 0 0 0 .465-.19z"
                                fill="#9CA2AA"
                              ></path>
                            </svg>
                          </span>
                          &nbsp;&nbsp;{product.engine_volume / 1000}&nbsp;
                          {product.fuel_type_id}
                        </div>
                      </div>
                      <div
                        className="w-50 px-8px px-md-12px py-10px mb-10px " /*px-8px px-md-12px py-10px mb-10px*/
                      >
                        <div
                          className="d-flex align-item-center font-size-12 font-size-md-13 text-gray-800"
                          // style={{
                          //   fontFamily: "TBC Sailec",
                          //   fontStyle: "normal",
                          //   fontWeight: "500",
                          //   // fontSize: '12px',
                          //   color: "#1B1D25",
                          // }}
                        >
                          <span
                            className="d-flex mr-8px mr-md-12px" /*mr-8px mr-md-12px*/
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="6.3"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                              ></circle>
                              <circle
                                cx="8"
                                cy="8"
                                r="1.3"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                              ></circle>
                              <path
                                d="M12 8a4 4 0 0 0-8 0"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                                stroke-linecap="round"
                              ></path>
                              <path
                                d="m9 7 1.5-1.5"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </span>
                          &nbsp;&nbsp;{product.car_run_km} კმ
                        </div>
                      </div>
                      <div
                        className="w-50 px-8px px-md-12px py-10px " /*px-8px px-md-12px py-10px */
                      >
                        <div
                          className="d-flex align-item-center font-size-12 font-size-md-13 text-gray-800"
                          // style={{
                          //   fontFamily: "TBC Sailec",
                          //   fontStyle: "normal",
                          //   fontWeight: "500",
                          //   // fontSize: '12px',
                          //   color: "#1B1D25",
                          // }}
                        >
                          <span
                            className="d-flex mr-8px mr-md-12px" /*mr-8px mr-md-12px*/
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="2.6"
                                y="7.6"
                                width="10.8"
                                height="7.8"
                                rx="1.2"
                                stroke="#8C929B"
                                stroke-width="1.2"
                              ></rect>
                              <path
                                d="M8 5v5"
                                stroke="#8C929B"
                                stroke-width="1.2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M8 12v1.5"
                                stroke="#8C929B"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                              <circle
                                cx="8"
                                cy="2.5"
                                r="1.8"
                                stroke="#8C929B"
                                stroke-width="1.4"
                              ></circle>
                              <path
                                d="M5 10v3M11 10v3"
                                stroke="#8C929B"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </span>
                          &nbsp;&nbsp;{product.gear_type_id}
                        </div>
                      </div>
                      <div
                        className="w-50 px-8px px-md-12px py-10px " /*px-8px px-md-12px py-10px*/
                      >
                        <div
                          className="d-flex align-item-center font-size-12 font-size-md-13 text-gray-800"
                          // style={{
                          //   fontFamily: "TBC Sailec",
                          //   fontStyle: "normal",
                          //   fontWeight: "500",
                          //   // fontSize: '12px',
                          //   color: "#1B1D25",
                          // }}
                        >
                          <span
                            className="d-flex mr-8px mr-md-12px" /*mr-8px mr-md-12px*/
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="6.3"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                              ></circle>
                              <circle
                                cx="8"
                                cy="8"
                                r="1.3"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                              ></circle>
                              <path
                                d="m9.5 8 4-1.5M6.214 8 2 7.299M8 9.5V14"
                                stroke="#9CA2AA"
                                stroke-width="1.4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>
                            </svg>
                          </span>
                          &nbsp;&nbsp;
                          {product.right_wheel ? "მარჯვენა" : "მარცხენა"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex flex-lg-column align-items-center align-items-lg-end justify-content-between justify-content-lg-start p-16px p-m-0 w-100 w-lg-auto" /*p-16px*/
                  >
                    <div
                      className="d-flex flex-column mb-lg-12px" /*mb-lg-12px*/
                    >
                      <div
                        className="d-flex align-items-center justify-content-m-end mt-lg-n4px" /*mt-lg-n4px*/
                      >
                        <div
                          className="d-flex align-items-center font-medium font-size-20 line-height-1 text-gray-800"
                          // style={{
                          //   fontSize: "26px",
                          // }}
                        >
                          <div className="d-inline-flex align-items-center undefined">
                            {product.price}&nbsp;
                            <span className="d-flex ml-2" /*ml-8px*/></span>
                          </div>
                        </div>
                        <div
                          className="d-flex"
                          // style={{
                          //   height: "24px",
                          //   width: "26px",
                          //   borderRadius: "12px",
                          //   background: "#F2F3F6",
                          // }}
                        >
                          {/* დოლარის ნიშანი როცა მონიშნული არ არის*/}

                          <span className="d-flex align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer bg-transparent text-gray-800-20 icon-gray-800-20">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="9px"
                              height="14px"
                              viewBox="0 0 9 14"
                            >
                              <path
                                id="_"
                                data-name="$"
                                d="M1.974-3.248H0A3.8,3.8,0,0,0,1.022-.742a3.783,3.783,0,0,0,2.45.966v1.19H4.3V.224A4.359,4.359,0,0,0,6.02-.2a3.707,3.707,0,0,0,1.071-.8,2.62,2.62,0,0,0,.553-.917A2.6,2.6,0,0,0,7.8-2.688a7.425,7.425,0,0,0-.049-.8,2.226,2.226,0,0,0-.315-.9,3.024,3.024,0,0,0-.826-.861,4.839,4.839,0,0,0-1.6-.693q-.2-.056-.371-.1L4.3-6.118V-8.6A1.033,1.033,0,0,1,5.11-8.2a1.472,1.472,0,0,1,.35.952H7.448a3.209,3.209,0,0,0-.308-1.26A2.783,2.783,0,0,0,6.454-9.4a3.178,3.178,0,0,0-.973-.56A5.033,5.033,0,0,0,4.3-10.234v-1.078H3.472v1.078a4.667,4.667,0,0,0-1.218.245,3.291,3.291,0,0,0-1.036.574A2.8,2.8,0,0,0,.5-8.5a2.782,2.782,0,0,0-.273,1.26A2.569,2.569,0,0,0,.462-6.069a2.325,2.325,0,0,0,.637.784,3.337,3.337,0,0,0,.9.5q.5.189,1.022.329.14.028.259.063t.189.063V-1.4a1.955,1.955,0,0,1-1.078-.588A1.72,1.72,0,0,1,1.974-3.248ZM4.3-1.4V-4.088a3.381,3.381,0,0,1,1.169.5.983.983,0,0,1,.343.819,1.152,1.152,0,0,1-.14.581,1.385,1.385,0,0,1-.357.413,1.641,1.641,0,0,1-.49.259A2.555,2.555,0,0,1,4.3-1.4ZM3.472-8.6v2.282a2.3,2.3,0,0,1-.966-.406.889.889,0,0,1-.294-.714,1.162,1.162,0,0,1,.1-.511A1.048,1.048,0,0,1,2.6-8.309a1.219,1.219,0,0,1,.406-.217A1.54,1.54,0,0,1,3.472-8.6Z"
                                transform="translate(0.544 11.812)"
                                fill="#272a37"
                                stroke="rgba(0,0,0,0)"
                                stroke-width="1"
                              ></path>
                            </svg>
                          </span>

                          {/* დოლარის ნიშანი როცა მონიშნულია 
                          
                          <span className="d-flex align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer bg-gray-350 text-gray-800 icon-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="9px"
                              height="14px"
                              viewBox="0 0 9 14"
                            >
                              <path
                                id="_"
                                data-name="$"
                                d="M1.974-3.248H0A3.8,3.8,0,0,0,1.022-.742a3.783,3.783,0,0,0,2.45.966v1.19H4.3V.224A4.359,4.359,0,0,0,6.02-.2a3.707,3.707,0,0,0,1.071-.8,2.62,2.62,0,0,0,.553-.917A2.6,2.6,0,0,0,7.8-2.688a7.425,7.425,0,0,0-.049-.8,2.226,2.226,0,0,0-.315-.9,3.024,3.024,0,0,0-.826-.861,4.839,4.839,0,0,0-1.6-.693q-.2-.056-.371-.1L4.3-6.118V-8.6A1.033,1.033,0,0,1,5.11-8.2a1.472,1.472,0,0,1,.35.952H7.448a3.209,3.209,0,0,0-.308-1.26A2.783,2.783,0,0,0,6.454-9.4a3.178,3.178,0,0,0-.973-.56A5.033,5.033,0,0,0,4.3-10.234v-1.078H3.472v1.078a4.667,4.667,0,0,0-1.218.245,3.291,3.291,0,0,0-1.036.574A2.8,2.8,0,0,0,.5-8.5a2.782,2.782,0,0,0-.273,1.26A2.569,2.569,0,0,0,.462-6.069a2.325,2.325,0,0,0,.637.784,3.337,3.337,0,0,0,.9.5q.5.189,1.022.329.14.028.259.063t.189.063V-1.4a1.955,1.955,0,0,1-1.078-.588A1.72,1.72,0,0,1,1.974-3.248ZM4.3-1.4V-4.088a3.381,3.381,0,0,1,1.169.5.983.983,0,0,1,.343.819,1.152,1.152,0,0,1-.14.581,1.385,1.385,0,0,1-.357.413,1.641,1.641,0,0,1-.49.259A2.555,2.555,0,0,1,4.3-1.4ZM3.472-8.6v2.282a2.3,2.3,0,0,1-.966-.406.889.889,0,0,1-.294-.714,1.162,1.162,0,0,1,.1-.511A1.048,1.048,0,0,1,2.6-8.309a1.219,1.219,0,0,1,.406-.217A1.54,1.54,0,0,1,3.472-8.6Z"
                                transform="translate(0.544 11.812)"
                                fill="#272a37"
                                stroke="rgba(0,0,0,0)"
                                stroke-width="1"
                              ></path>
                            </svg>
                          </span> */}

                          {/* ლარის ნიშანი როცა მონიშნული არის*/}

                          <span
                            className="d-flex align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer bg-gray-350 text-gray-800 icon-gray-800"
                            /*w-24px h-24px*/
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10px"
                              height="11px"
                              viewBox="0 0 10 11"
                            >
                              <path
                                id="GEL"
                                d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z"
                                transform="translate(-305 29)"
                                fill="#272a37"
                              ></path>
                            </svg>
                          </span>

                          {/* ლარის ნიშანი როცა მონიშნული არ არის
                          
                          <span className="d-flex align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer bg-transparent text-gray-800-20 icon-gray-800-20">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10px"
                              height="11px"
                              viewBox="0 0 10 11"
                            >
                              <path
                                id="GEL"
                                d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z"
                                transform="translate(-305 29)"
                                fill="#272a37"
                              ></path>
                            </svg>
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex justify-content-between align-items-center border-top border-solid-1 border-solid-m-0 py-12px px-16px p-m-0 border-gray-100"
                  // /*py-12px px-16px*/ style={{
                  //   marginTop: "5px",
                  // }}
                >
                  <div className="d-flex align-items-center">
                    <span
                      className="bg-orange d-flex align-items-center justify-content-center rounded font-bold font-size-10 text-white text-uppercase
                            h-20px px-10px mr-16px text-nowrap"
                      // /*h-20px px-10px mr-16px*/ style={{
                      //   background: "#4A6CFA",
                      //   height: "20px",
                      //   width: "32px",
                      //   left: "0px",
                      //   top: "0px",
                      //   borderRadius: "100px",
                      //   padding: "3px 8px 3px 8px",
                      // }}
                    >
                      VIP
                    </span>
                    &nbsp;
                    <div
                      className="d-flex align-items-center font-size-12 text-gray-500"
                      // style={{
                      //   fontFamily: "Helvetica Neue LT GEO",
                      //   fontStyle: "normal",
                      //   fontWeight: "400",
                      //   // fontSize: '12px',
                      //   color: "#6F7383",
                      // }}
                    >
                      {product.views}&nbsp;ნახვა&nbsp;&nbsp;
                      <span
                        className="d-inline-flex w-2px h-2px round-circle bg-gray-500 mx-10px "
                        // /*w-2px h-2px mx-10px*/ style={{
                        //   width: "3px",
                        //   height: "3px",
                        //   background: "#8C929B",
                        // }}
                      ></span>
                      &nbsp;
                      {getTimePassed(product)}
                    </div>
                  </div>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="action-icon tooltip-parent border-0 bg-transparent ml-8px w-24px h-24px 
                            rounded-xs d-flex align-items-center justify-content-center hover-icon-green-250 cursor-pointer transition-all " /*ml-8px w-24px h-24px*/
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.91675 7C4.91675 6.58579 5.25253 6.25 5.66675 6.25H10.3334C10.7476 6.25 11.0834 6.58579 11.0834 7C11.0834 7.41421 10.7476 7.75 10.3334 7.75H5.66675C5.25253 7.75 4.91675 7.41421 4.91675 7Z"
                          fill="#6F7383"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.71959 2.00645C2.46251 1.26354 3.49615 0.870117 4.66658 0.870117H11.3333C12.5037 0.870117 13.5373 1.26354 14.2802 2.00645C15.0232 2.74937 15.4166 3.78301 15.4166 4.95345V8.95345C15.4166 10.1239 15.0232 11.1575 14.2802 11.9004C13.7006 12.4801 12.9438 12.847 12.0833 12.9803V13.7068C12.0833 14.8428 10.8196 15.5073 9.88455 14.8846M9.8839 14.8842L7.10659 13.0368H4.66658C3.49615 13.0368 2.46251 12.6434 1.71959 11.9004C0.976671 11.1575 0.583252 10.1239 0.583252 8.95345V4.95345C0.583252 3.78301 0.976671 2.74937 1.71959 2.00645M2.78025 3.06711C2.3565 3.49086 2.08325 4.12389 2.08325 4.95345V8.95345C2.08325 9.78302 2.3565 10.416 2.78025 10.8398C3.204 11.2635 3.83702 11.5368 4.66658 11.5368H7.33325C7.48106 11.5368 7.62557 11.5805 7.74863 11.6623L10.5833 13.5478V12.2868C10.5833 11.8726 10.919 11.5368 11.3333 11.5368C12.1628 11.5368 12.7958 11.2635 13.2196 10.8398C13.6433 10.416 13.9166 9.78302 13.9166 8.95345V4.95345C13.9166 4.12389 13.6433 3.49086 13.2196 3.06711C12.7958 2.64336 12.1628 2.37012 11.3333 2.37012H4.66658C3.83702 2.37012 3.204 2.64336 2.78025 3.06711Z"
                          fill="#6F7383"
                        ></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="action-icon tooltip-parent border-0 bg-transparent w-24px h-24px 
                            rounded-xs d-flex align-items-center justify-content-center cursor-pointer transition-all ml-8px" /* w-24px h-24px ml-8px*/
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.1971 1.86358C15.49 1.57069 15.49 1.09582 15.1971 0.802922C14.9042 0.510029 14.4293 0.510029 14.1364 0.802922L11.9576 2.98172C10.763 2.1811 9.41024 1.73657 7.9999 1.73657C5.32859 1.73657 2.92164 3.31184 1.29406 5.8702C0.898865 6.48961 0.726562 7.26919 0.726562 8.00324C0.726562 8.73727 0.898856 9.51683 1.29403 10.1362L1.29406 5.8702L1.29437 10.1368C1.75821 10.8647 2.28833 11.5159 2.86715 12.0722L0.802922 14.1364C0.510029 14.4293 0.510029 14.9042 0.802922 15.1971C1.09582 15.49 1.57069 15.49 1.86358 15.1971L6.84358 10.2171L6.85167 10.2089L10.2089 6.85167C10.2116 6.849 10.2144 6.8463 10.2171 6.84358L15.1971 1.86358ZM9.62304 5.31632L10.8716 4.06773C9.96926 3.52124 8.9924 3.23657 7.9999 3.23657C5.96471 3.23657 3.98512 4.43444 2.55938 6.67578L2.55875 6.67677C2.35417 6.99728 2.22656 7.47748 2.22656 8.00324C2.22656 8.52899 2.35417 9.0092 2.55875 9.32971L2.5591 9.33025C2.96933 9.97416 3.43253 10.5386 3.92806 11.0113L5.31632 9.62304C5.029 9.1501 4.86328 8.59531 4.86328 7.99995C4.86328 6.26573 6.26573 4.86328 7.99995 4.86328C8.59531 4.86328 9.1501 5.029 9.62304 5.31632ZM6.36328 7.99995C6.36328 7.09416 7.09416 6.36328 7.99995 6.36328C8.17434 6.36328 8.34172 6.39024 8.49872 6.44051L6.44051 8.49872C6.39024 8.34172 6.36328 8.17434 6.36328 7.99995ZM12.8967 4.70224C13.2195 4.44263 13.6916 4.49382 13.9512 4.81658C14.2115 5.14023 14.4684 5.48942 14.7061 5.86379C15.1012 6.48316 15.2735 7.26267 15.2735 7.99665C15.2735 8.7307 15.1012 9.51028 14.706 10.1297C13.0784 12.6881 10.6715 14.2633 8.00014 14.2633C7.07361 14.2633 6.1683 14.0674 5.32243 13.7112C4.94068 13.5505 4.76151 13.1107 4.92225 12.7289C5.08299 12.3472 5.52276 12.168 5.90452 12.3288C6.57865 12.6126 7.28668 12.7633 8.00014 12.7633C10.0353 12.7633 12.0149 11.5654 13.4407 9.32411L13.4413 9.32312C13.6459 9.0026 13.7735 8.5224 13.7735 7.99665C13.7735 7.47089 13.6459 6.99069 13.4413 6.67017L13.4402 6.66852C13.238 6.34993 13.0152 6.04612 12.7824 5.75672C12.5228 5.43396 12.574 4.96185 12.8967 4.70224ZM11.0774 8.60269C11.1525 8.19534 10.8832 7.80423 10.4759 7.72912C10.0685 7.65401 9.6774 7.92333 9.60228 8.33068C9.48535 8.96483 8.95799 9.49219 8.32384 9.60912C7.9165 9.68423 7.64717 10.0753 7.72228 10.4827C7.7974 10.89 8.18851 11.1594 8.59585 11.0843C9.84171 10.8545 10.8477 9.84854 11.0774 8.60269Z"
                          fill="#6F7383"
                        ></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="{`carIcon ${like === 'carIcon' ? 'active' : ''}`}action-icon tooltip-parent border-0 bg-transparent ml-8px w-24px h-24px 
                            rounded-xs d-flex align-items-center justify-content-center hover-icon-orange cursor-pointer transition-all "
                      onClick={() =>
                        likeClick("likeClick")
                      } /** ml-8px w-24px h-24px */
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.68574 2.1679C8.51267 2.29346 8.3477 2.43458 8.19095 2.5894L8.0626 2.72088L8 2.78989L7.9374 2.72088L7.80905 2.5894C7.6523 2.43458 7.48733 2.29346 7.31426 2.1679C6.73288 1.74614 6.06008 1.5 5.3 1.5C2.58473 1.5 1 3.87655 1 6.304C1 8.67851 2.19139 10.7406 4.13701 12.4002C5.50533 13.5673 7.2954 14.5 8 14.5C8.705 14.5 10.495 13.5674 11.8633 12.4002C13.8088 10.7406 15 8.67852 15 6.304C15 3.87655 13.4153 1.5 10.7 1.5C9.93992 1.5 9.26711 1.74614 8.68574 2.1679ZM6.67538 3.71857C6.23895 3.2911 5.78989 3.1 5.3 3.1C3.75142 3.1 2.6 4.44771 2.6 6.304C2.6 8.08759 3.48098 9.73759 5.17536 11.1829C5.76665 11.6872 6.46051 12.1489 7.07374 12.4778C7.37967 12.6419 7.64224 12.7605 7.84224 12.8338C7.91231 12.8595 7.96436 12.8758 8.00009 12.886C8.03585 12.8758 8.08795 12.8595 8.1581 12.8338C8.35812 12.7605 8.62069 12.6419 8.92662 12.4778C9.53983 12.1489 10.2337 11.6873 10.825 11.1829C12.5191 9.73772 13.4 8.08768 13.4 6.304C13.4 4.44771 12.2486 3.1 10.7 3.1C10.2101 3.1 9.76105 3.29109 9.32462 3.71857L9.228 3.81755L8 5.17143L6.77199 3.81755L6.67538 3.71857Z"
                          fill="#6F7383"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* დილერის ბოქსი
            <div className="d-flex align-items-center justify-content-between px-16px py-8px border  border-top border-gray-100">
                        <div className="d-flex align-items-center">
                          <div className="h-40px mr-12px">
                            <a href="https://myauto.ge/ka/dealers/dealerbox/4694514">
                              <img className="mw-100 mh-100" src="https://static.my.ge/myauto/dealers/logos/4694514.jpg?v=1"/>
                            </a>
                          </div>
                          <div className="d-flex flex-column justify-content-between">
                            <p className="text-gray-800 font-medium font-size-12">კავკასიის სატრანსპორტო კომპანია 2019
                            </p>
                            <a className="d-flex align-items-center text-gray-500 font-base font-size-11 cursor-pointer" href="https://myauto.ge/ka/dealers/dealerbox/4694514">
                              <span className="d-flex mr-8px">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                  <path fill="#8996ae" d="M5.5,3.75H12v1H5.5ZM3,3.5H4.5V5H3ZM3,7H4.5V8.5H3Zm0,3.5H4.5V12H3ZM5.5,7.25H12v1H5.5Zm0,3.5H12v1H5.5Z" transform="translate(-1.5 -1.75)">
                                  </path>
                                </svg>
                              </span>ყველა განცხადება 
                              <span className="ml-4px">(1223)
                              </span>
                            </a>
                          </div>
                        </div>
                    </div>*/}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
