import React, { useEffect, useState } from 'react';
import { fetchModels, fetchManufacturers, fetchCategories, fetchData, Manufacturer, Model, Category, Item } from './dataService';
import "./App.css"
import Container from './container';
import Products from './Products';


function App() {
  const [models, setModels] = useState<Model[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    fetchManufacturerModelsAndDisplay();
    fetchManufacturersAndDisplay();
    fetchCategoriesAndDisplay();
    fetchProductsAndDisplay();
  }, []);

  function fetchManufacturerModelsAndDisplay() {
    const manufacturerId = '10'; // Example manufacturer ID

    fetchModels(manufacturerId)
      .then((models) => {
        setModels(models);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function fetchManufacturersAndDisplay() {
    fetchManufacturers()
      .then((manufacturers) => {
        setManufacturers(manufacturers);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function fetchCategoriesAndDisplay() {
    fetchCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function fetchProductsAndDisplay() {
    const searchParams = {}; // Add any necessary search parameters
    fetchData(searchParams)
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        console.error('Error:', error);
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
        const diffInHours = (currentTime.getTime() - carPublishedTime.getTime()) / (1000 * 60 * 60);
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
    window.location.href = '/ka/';
  };

  


  return (
      <div id='app'>
          <div className='app-wraper' >
              <header className='header shadow-sm position-sticky top-0 left-0 w-100 
              z-index-1 box-shadow-none box-shadow-sm-sm' style={{
                display:'flex',
                justifyContent:'center',
                zIndex: '10'
              }}>   
              <div className='myautologoContainer'>

                <div className='myautologo' style={{ display: 'flex', justifyContent: 'center' }}>
                <button className='logo' onClick={handleClick} style={{ marginLeft: '-865px',display: 'flex',alignItems: 'flex-start' }}></button>
                </div>
                </div>        
              
              </header>

            <div className='app-content ' style={{
              backgroundColor: '#E5E5E5',
            }}>
              <div className='ragaca'> 
              <div className='mtavariContainer2' style={{ display: 'flex', justifyContent: 'center' }}>
  <div className='mtavariContainer1' style={{ display: 'flex',alignItems: 'flex-start' }}>
    <div className="mtavari" style={{ marginLeft: '-498px', paddingTop: '32px', paddingBottom: '22px' }}>
      <div className="d-flex align-items-center" style={{
        width: '52px',
        height: '14px',
        fontFamily: 'Helvetica Neue LT GEO',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#6F7383'
      }}>
        <a className="d-flex align-items-center text-gray-850 hover-text-gray-800 font-size-12 cursor-pointer" href="/ka/"
          style={{
            color: '#6F7383',
            textDecoration: 'none',
            // marginLeft: '24px',
          }}>
          მთავარი
          <span className="d-flex" style={{ marginLeft: '6px', marginRight: '6px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="8" viewBox="0 0 4.414 6.826">
              <path style={{
                fill: 'none', stroke: '#6F7383', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2px',
              }} d="M0,4,2,2,0,0" transform="translate(1.414 1.414)">
              </path>
            </svg>
          </span>
        </a>
        <span className="d-flex align-items-center text-gray-850 font-size-12 cursor-default">
        </span>
      </div>
    </div>
  </div>
</div>


              <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{display:'flex' ,width:'10%', justifyContent:'center'}}>
                  <Container/>
                  <Products/>
                </div>
                
              </div>
              </div>
            
            
          {/* <div style={{ background: '#E5E5E5' }}> */}
            {/*<div className='Periods'>
              <div className='period'>
                <select className='details' onClick={filterCarsByHours}>
                <option value="0">All</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hour</option>
                  <option value="3">3 hour</option>
                  <option value="24">1 day</option>
                  <option value="48">2 day</option>
                  <option value="72">3 day</option>
                  <option value="168">1 week</option>
                  <option value="336">2 week</option>
                  <option value="504">3 week</option>
                </select>
              </div>
              <div className='period1'>
              <select className='details1' onClick={sortCars}>
                <option value="1.1">decreasing date</option>
                <option value="2.1">increasing date</option>
                <option value="3.1">decreasing price</option>
                <option value="4.1">increasing price</option>
                <option value="5.1">decreasing mileage</option>
                <option value="6.1">increasing mileage</option>
              </select> 
              </div>
            </div>*/}
            {/* <div>
              <h1>Manufacturer Models</h1>
              <ul>
                {models.map((model) => (
                  <li key={model.model_id}>
                    <strong>ID : </strong>{model.model_id}
                    <strong> name :</strong>{model.model_name}
                    <strong> model_group :</strong>{model.model_group}
                    <strong> sort_order :</strong>{model.sort_order}
                  
                    
                    </li>
                ))}
              </ul>
            </div> */}
            {/* export interface Model {
          model_id: number;
          man_id:number;
          model_name: string;
          model_group: string;
          sort_order: number;
          cat_man_id: number;
          cat_model_id: number;
          cat_modif_id: number;
          is_car: boolean;
          is_moto: boolean;
          is_spec: boolean;
          show_in_salons:number;
          shown_in_slider:number;
        } */}
            {/* <div>
              <h1>Manufacturer List</h1>
              <ul>
                {manufacturers.map((manufacturer) => (
                  <li key={manufacturer.man_id}>
                    <strong>ID:</strong> {manufacturer.man_id}<br />
                    <strong>Name:</strong> {manufacturer.man_name}<br />
                    <hr />
                  </li>
                ))}
              </ul>
            </div> */}
      
            {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h1>Categories</h1>
              <ul>
                

                {categories.map((category) => (
                  <li key={category.category_id}>

                    <strong>ID:</strong> {category.category_id}<br />
                    <strong>Type:</strong> {category.category_type}<br />
                    <strong>Has icon:</strong> {category.has_icon ? 'Yes':'No'}<br />
                    <strong>Title:</strong> {category.title}<br />
                    <strong>SEO Title:</strong> {category.seo_title}<br />
                    <strong>Vehicle Types:</strong> {category.vehicle_types.join(', ')}<br />
                    <hr />
                  </li>
                ))}
              </ul>
            </div> */}{/*
          \ <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h1>Products</h1>
              <ul>
                {products.map((product) => (
                  <li
                    key={product.car_id}
                    className="box"
                    style={{
                      // height: '233px',
                      // width: '780px',
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      padding: '10px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        marginLeft: '220px',
                      }}
                    > */}
                      {/* <strong>ID:</strong> {product.car_id}<br />
                      <strong>Title:</strong> {product.car_model}<br />
                      <strong>Description:</strong> {product.car_desc}<br />  */} {/*



                      car_id: <span id="carId">{product.car_id}</span><br />
                      status_id: <span id="statusId">{product.status_id}</span><br />
                      user_id: <span id="userId">{product.user_id}</span><br />
                      dealer_user_id: <span id="dealerUserId">{product.dealer_user_id}</span><br />
                      paid_add: <span id="paidAdd">{product.paid_add}</span><br />
                      photo: <span id="photo">{product.photo}</span><br />
                      pic_number: <span id="picNumber">{product.pic_number}</span><br />
                      prod_year: <span id="prodYear">{product.prod_year}</span><br />
                      prod_month: <span id="prodMonth">{product.prod_month}</span><br />
                      man_id: <span id="manId">{product.man_id}</span><br />
                      car_model: <span id="carModel">{product.car_model}</span><br />
                      price: <span id="price">{product.price}</span><br />
                      price_usd: <span id="priceUsd">{product.price_usd}</span><br />
                      first_deposit: <span id="firstDeposit">{product.first_deposit}</span><br />
                      price_value: <span id="priceValue">{product.price_value}</span><br />
                      fuel_type_id: <span id="fuelTypeId">{product.fuel_type_id}</span><br />
                      gear_type_id: <span id="gearTypeId">{product.gear_type_id}</span><br />
                      drive_type_id: <span id="driveTypeId">{product.drive_type_id}</span><br />
                      door_type_id: <span id="doorTypeId">{product.door_type_id}</span><br />
                      color_id: <span id="colorId">{product.color_id}</span><br />
                      saloon_color_id: <span id="saloonColorId">{product.saloon_color_id}</span><br />
                      cylinders: <span id="cylinders">{product.cylinders}</span><br />
                      car_run: <span id="carRun">{product.car_run}</span><br />
                      car_run_km: <span id="carRunKm">{product.car_run_km}</span><br />
                      car_run_dim: <span id="carRunDim">{product.car_run_dim}</span><br />
                      engine_volume: <span id="engineVolume">{product.engine_volume}</span><br />
                      airbags: <span id="airbags">{product.airbags}</span><br />
                      abs: <span id="abs">{product.abs ? 'Yes' : 'No'}</span><br />
                      esd: <span id="esd">{product.esd ? 'Yes' : 'No'}</span><br />
                      el_windows: <span id="elWindows">{product.el_windows ? 'Yes' : 'No'}</span><br />
                      conditioner: <span id="conditioner">{product.conditioner ? 'Yes' : 'No'}</span><br />
                      leather: <span id="leather">{product.leather ? 'Yes' : 'No'}</span><br />
                      disks: <span id="disks">{product.disks ? 'Yes' : 'No'}</span><br />
                      nav_system: <span id="navSystem">{product.nav_system ? 'Yes' : 'No'}</span><br />
                      central_lock: <span id="centralLock">{product.central_lock ? 'Yes' : 'No'}</span><br />
                      hatch: <span id="hatch">{product.hatch ? 'Yes' : 'No'}</span><br />
                      right_wheel: <span id="rightWheel">{product.right_wheel ? 'Yes' : 'No'}</span><br />
                      alarm: <span id="alarm">{product.alarm ? 'Yes' : 'No'}</span><br />
                      board_comp: <span id="boardComp">{product.board_comp ? 'Yes' : 'No'}</span><br />
                      hydraulics: <span id="hydraulics">{product.hydraulics ? 'Yes' : 'No'}</span><br />
                      chair_warming: <span id="chairWarming">{product.chair_warming ? 'Yes' : 'No'}</span><br />
                      climat_control: <span id="climatControl">{product.climat_control ? 'Yes' : 'No'}</span><br />
                      obstacle_indicator: <span id="obstacleIndicator">{product.obstacle_indicator ? 'Yes' : 'No'}</span><br />
                      customs_passed: <span id="customsPassed">{product.customs_passed ? 'Yes' : 'No'}</span><br />
                      client_name: <span id="clientName">{product.client_name}</span><br />
                      client_phone: <span id="clientPhone">{product.client_phone}</span><br />
                      model_id: <span id="modelId">{product.model_id}</span><br />
                      location_id: <span id="locationId">{product.location_id}</span><br />
                      parent_loc_id: <span id="parentLocId">{product.parent_loc_id}</span><br />
                      tech_inspection: <span id="techInspection">{product.tech_inspection ? 'Yes' : 'No'}</span><br />
                      checked_for_duplicates: <span id="checkedForDuplicates">{product.checked_for_duplicates ? 'Yes' : 'No'}</span><br />
                      order_number: <span id="orderNumber">{product.order_number}</span><br />
                      stickers: <span id="stickers">{product.stickers ? 'Yes' : 'No'}</span><br />
                      changable: <span id="changable">{product.changable ? 'Yes' : 'No'}</span><br />
                      auction: <span id="auction">{product.auction ? 'Yes' : 'No'}</span><br />
                      has_turbo: <span id="hasTurbo">{product.has_turbo ? 'Yes' : 'No'}</span><br />
                      for_rent: <span id="forRent">{product.for_rent ? 'Yes' : 'No'}</span><br />
                      rent_daily: <span id="rentDaily">{product.rent_daily ? 'Yes' : 'No'}</span><br />
                      rent_purchase: <span id="rentPurchase">{product.rent_purchase ? 'Yes' : 'No'}</span><br />
                      rent_insured: <span id="rentInsured">{product.rent_insured ? 'Yes' : 'No'}</span><br />
                      rent_driver: <span id="rentDriver">{product.rent_driver ? 'Yes' : 'No'}</span><br />
                      currency_id: <span id="currencyId">{product.currency_id}</span><br />
                      vehicle_type: <span id="vehicleType">{product.vehicle_type}</span><br />
                      category_id: <span id="categoryId">{product.category_id}</span><br />
                      vin: <span id="vin">{product.vin}</span><br />
                      user_type: <span id="userType">{product.user_type}</span><br />
                      prom_color: <span id="promColor">{product.prom_color}</span><br />
                      special_persons: <span id="specialPersons">{product.special_persons ? 'Yes' : 'No'}</span><br />
                      back_camera: <span id="backCamera">{product.back_camera ? 'Yes' : 'No'}</span><br />
                      car_desc: <span id="carDesc">{product.car_desc}</span><br />
                      order_date: <span id="orderDate">{product.order_date}</span><br />
                      video_url: <span id="videoUrl">{product.video_url}</span><br />
                      hp: <span id="hp">{product.hp}</span><br />
                      hours_used: <span id="hoursUsed">{product.hours_used}</span><br />
                      photo_ver: <span id="photoVer">{product.photo_ver}</span><br />
                      checked: <span id="checked">{product.checked ? 'Yes' : 'No'}</span><br />
                      lang_type_id: <span id="langTypeId">{product.lang_type_id}</span><br />
                      el_starter: <span id="elStarter">{product.el_starter}</span><br />
                      start_stop: <span id="startStop">{product.start_stop ? 'Yes' : 'No'}</span><br />
                      trunk: <span id="trunk">{product.trunk ? 'Yes' : 'No'}</span><br />
                      windshield: <span id="windshield">{product.windshield ? 'Yes' : 'No'}</span><br />
                      inspected_in_greenway: <span id="inspectedInGreenway">{product.inspected_in_greenway ? 'Yes' : 'No'}</span><br />
                      license_number: <span id="licenseNumber">{product.license_number}</span><br />
                      words_checked: <span id="wordsChecked">{product.words_checked}</span><br />
                      is_payd: <span id="isPayd">{product.is_payd ? 'Yes' : 'No'}</span><br />
                      condition_type_id: <span id="conditionTypeId">{product.condition_type_id}</span><br />
                      primary_damage_type: <span id="primaryDamageType">{product.primary_damage_type}</span><br />
                      secondary_damage_type: <span id="secondaryDamageType">{product.secondary_damage_type}</span><br />
                      auction_has_key: <span id="auctionHasKey">{product.auction_has_key}</span><br />
                      is_auction: <span id="isAuction">{product.is_auction}</span><br />
                      saloon_material_id: <span id="saloonMaterialId">{product.saloon_material_id}</span><br />
                      map_lat: <span id="mapLat">{product.map_lat}</span><br />
                      map_long: <span id="mapLong">{product.map_long}</span><br />
                      zoom: <span id="zoom">{product.zoom}</span><br />
                      predicted_price: <span id="predictedPrice">{product.predicted_price ? 'Yes' : 'No'}</span><br />
                      hdd: <span id="hdd">{product.hdd}</span><br />
                      map_title: <span id="mapTitle">{product.map_title}</span><br />
                      has_catalyst: <span id="hasCatalyst">{product.has_catalyst}</span><br />
                      tmp: <span id="tmp">{product.tmp}</span><br />
                      views: <span id="views">{product.views}</span><br />
                      dealerId: <span id="dealerId">{product.dealerId}</span><br />
                      has_logo: <span id="hasLogo">{product.has_logo}</span><br />
                      logo_ver: <span id="logoVer">{product.logo_ver}</span><br />
                      active_ads: <span id="activeAds">{product.active_ads}</span><br />
                      dealer_title: <span id="dealerTitle">{product.dealer_title}</span><br />
                      has_predicted_price: <span id="hasPredictedPrice">{product.has_predicted_price}</span><br />
                      pred_first_breakpoint: <span id="predFirstBreakpoint">{product.pred_first_breakpoint}</span><br />
                      pred_second_breakpoint: <span id="predSecondBreakpoint">{product.pred_second_breakpoint}</span><br />
                      pred_min_price: <span id="predMinPrice">{product.pred_min_price}</span><br />
                      pred_max_price: <span id="predMaxPrice">{product.pred_max_price}</span><br />
                      comfort_features: <span id="comfortFeatures">{product.comfort_features}</span><br />

                      
                    </div>
                    <div
                      style={{
                        height: '144px',
                        width: '182px',
                        position: 'absolute',
                        left: '-2.25%',
                        right: '0%',
                        top: '-2.14%',
                        bottom: '-0.71%',
                        background: `url(${product.photo})`,
                        backgroundSize: 'cover',
                        borderRadius: '8px',
                      }}
                    ></div>
                  </li>
                ))}
              </ul>
            </div>
                      */}

      </div>
    </div>
</div>
  );
  
  
  
}

export default App;
