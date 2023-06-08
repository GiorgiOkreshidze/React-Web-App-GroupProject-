  export interface Manufacturer {
    man_id: string;
    man_name: string;
    is_car: boolean;
    is_spec: boolean;
    is_moto: boolean;
  }
  
  export interface Model {
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
  }
  
  export interface Category {
    category_id: number;
    category_type: number;
    has_icon: number;
    title: string;
    seo_title: string;
    vehicle_types: number[];
  }
  
  

  export interface Item{
    car_id: number;
    status_id: number;
    user_id: number;
    dealer_user_id:number;
    paid_add: number;
    photo:string;
    pic_number:number;
    prod_year:number;
    prod_month:number;
    man_id:number;
    car_model:string;
    price:number;
    price_usd:number;
    first_deposit:number;
    price_value:number;
    fuel_type_id:number;
    gear_type_id:number;
    drive_type_id:number;
    door_type_id:number;
    color_id:number;
    saloon_color_id:number;
    cylinders:number;
    car_run:number;
    car_run_km:number;
    car_run_dim:number;
    engine_volume:number;
    airbags:number;
    abs:boolean;
    esd:boolean;
    el_windows:boolean;
    conditioner: boolean;
    leather: boolean;
    disks: boolean;
    nav_system: boolean;
    central_lock: boolean;
    hatch: boolean;
    right_wheel: boolean;
    alarm: boolean;
    board_comp:boolean;
    hydraulics: boolean;
    chair_warming: boolean;
    climat_control:boolean;
    obstacle_indicator: boolean;
    customs_passed: boolean;
    client_name: string;
    client_phone: number;
    model_id: number;
    location_id:number;
    parent_loc_id:number;
    tech_inspection:boolean;
    checked_for_duplicates: boolean;
    order_number: number;
    stickers: number;
    changable: boolean;
    auction: boolean;
    has_turbo: boolean;
    for_rent: boolean;
    rent_daily: boolean;
    rent_purchase: boolean;
    rent_insured: boolean;
    rent_driver: boolean;
    currency_id: number;
    vehicle_type: number;
    category_id:number;
    vin:string;
    user_type:any;// unknown type
    prom_color:number;
    special_persons:boolean;
    back_camera:boolean;
    car_desc:string;
    order_date: string; // could be date type there?
    video_url:string;
    hp:number;
    hours_used:number;
    photo_ver:number;
    checked: boolean;
    lang_type_id:number;
    el_starter:number;
    start_stop:boolean;
    trunk:boolean;
    windshield:boolean;
    inspected_in_greenway:boolean;
    license_number: string;
    words_checked:number;
    is_payd: boolean;
    condition_type_id: number;
    primary_damage_type: number;
    secondary_damage_type: number;
    auction_has_key:number;
    is_auction: number;
    saloon_material_id: number;
    map_lat: number;
    map_long:number;
    zoom: number;
    predicted_price: string;
    hdd: number;
    map_title:string;
    has_catalyst:number;
    tmp:string;
    views:number;
    dealerId:any; //unknown type
    has_logo: any; //unknown type
    logo_ver: any; //unknown type
    active_ads: any; //unknown type
    dealer_title: any; //unknown type
    has_predicted_price: boolean;
    pred_first_breakpoint: number;
    pred_second_breakpoint: number;
    pred_min_price: number;
    pred_max_price: number;
    comfort_features:number[];



  }
 
  export const getModelById = (models: Model[], modelId: number): Model | undefined => {
    return models.find((model) => model.model_id === modelId);
  };


  export const getManufacturerById = (manufacturers: Manufacturer[], manufacturerlId: string): Manufacturer | undefined => {
    return manufacturers.find((manufacturer) => manufacturer.man_id === manufacturerlId);
  };

  export const getCategoryById = (categories: Category[], categoryId: number): Category | undefined => {
    return categories.find((category) => category.category_id === categoryId);
  };
  
  
export const fetchManufacturers = (): Promise<Manufacturer[]> => {
  return fetch('https://static.my.ge/myauto/js/mans.json')
    .then((response) => response.json())
    .then((data) => {
      return data.map((manufacturer: any) => {
        return {
          man_id: manufacturer.man_id,
          man_name: manufacturer.man_name,
          is_car: manufacturer.is_car === "1",
          is_spec: manufacturer.is_spec === "1",
          is_moto: manufacturer.is_moto === "1",
        };
      });
    });
};

export const fetchModels = (manufacturerId: string): Promise<Model[]> => {
  const modelsEndpoint = `https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`;

  return fetch(modelsEndpoint)
    .then((response) => response.json())
    .then((data) => {
      return data.data.map((model: any) => {
        return {
          model_id: model.model_id,
          man_id: model.man_id,
          model_name: model.model_name,
          model_group: model.model_group,
          sort_order: model.sort_order,
          cat_man_id: model.cat_man_id,
          cat_model_id: model.cat_model_id,
          cat_modif_id: model.cat_modif_id,
          is_car: model.is_car,
          is_moto: model.is_moto,
          is_spec: model.is_spec,
          show_in_salons: model.show_in_salons,
          shown_in_slider: model.shown_in_slider,
        };
      });
    });
};

export const fetchCategories = (): Promise<Category[]> => {
  return fetch('https://api2.myauto.ge/ka/cats/get')
    .then((response) => response.json())
    .then((data) => {
      return data.data.map((category: any) => {
        return {
          category_id: category.category_id,
          category_type: category.category_type,
          has_icon: category.has_icon,
          title: category.title,
          seo_title: category.seo_title,
          vehicle_types: category.vehicle_types,
        };
      });
    });
};

export const fetchData = (searchParams: any): Promise<Item[]> => {
  const dataEndpoint = 'https://api2.myauto.ge/ka/products/';
  const queryParams = new URLSearchParams(searchParams);
  const url = `${dataEndpoint}?${queryParams.toString()}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const items = data.data.items;

      return items.map((item: any) => {
        const photo = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`;

        return {
          car_id: item.car_id,
          status_id: item.status_id,
          user_id: item.user_id,
          dealer_user_id: item.dealer_user_id,
          paid_add: item.paid_add,
          photo: photo,
          pic_number: item.pic_number,
          prod_year: item.prod_year,
          prod_month: item.prod_month,
          man_id: item.man_id,
          car_model: item.car_model,
          price: item.price,
          price_usd: item.price_usd,
          first_deposit: item.first_deposit,
          price_value: item.price_value,
          fuel_type_id: item.fuel_type_id,
          gear_type_id: item.gear_type_id,
          drive_type_id: item.drive_type_id,
          door_type_id: item.door_type_id,
          color_id: item.color_id,
          saloon_color_id: item.saloon_color_id,
          cylinders: item.cylinders,
          car_run: item.car_run,
          car_run_km: item.car_run_km,
          car_run_dim: item.car_run_dim,
          engine_volume: item.engine_volume,
          airbags: item.airbags,
          abs: item.abs,
          esd: item.esd,
          el_windows: item.el_windows,
          conditioner: item.conditioner,
          leather: item.leather,
          disks: item.disks,
          nav_system: item.nav_system,
          central_lock: item.central_lock,
          hatch: item.hatch,
          right_wheel: item.right_wheel,
          alarm: item.alarm,
          board_comp: item.board_comp,
          hydraulics: item.hydraulics,
          chair_warming: item.chair_warming,
          climat_control: item.climat_control,
          obstacle_indicator: item.obstacle_indicator,
          customs_passed: item.customs_passed,
          client_name: item.client_name,
          client_phone: item.client_phone,
          model_id: item.model_id,
          location_id: item.location_id,
          parent_loc_id: item.parent_loc_id,
          tech_inspection: item.tech_inspection,
          checked_for_duplicates: item.checked_for_duplicates,
          order_number: item.order_number,
          stickers: item.stickers,
          changable: item.changable,
          auction: item.auction,
          has_turbo: item.has_turbo,
          for_rent: item.for_rent,
          rent_daily: item.rent_daily,
          rent_purchase: item.rent_purchase,
          rent_insured: item.rent_insured,
          rent_driver: item.rent_driver,
          currency_id: item.currency_id,
          vehicle_type: item.vehicle_type,
          category_id: item.category_id,
          vin: item.vin,
          user_type: item.user_type,
          prom_color: item.prom_color,
          special_persons: item.special_persons,
          back_camera: item.back_camera,
          car_desc: item.car_desc,
          order_date: item.order_date,
          video_url: item.video_url,
          hp: item.hp,
          hours_used: item.hours_used,
          photo_ver: item.photo_ver,
          checked: item.checked,
          lang_type_id: item.lang_type_id,
          el_starter: item.el_starter,
          start_stop: item.start_stop,
          trunk: item.trunk,
          windshield: item.windshield,
          inspected_in_greenway: item.inspected_in_greenway,
          license_number: item.license_number,
          words_checked: item.words_checked,
          is_payd: item.is_payd,
          condition_type_id: item.condition_type_id,
          primary_damage_type: item.primary_damage_type,
          secondary_damage_type: item.secondary_damage_type,
          auction_has_key: item.auction_has_key,
          is_auction: item.is_auction,
          saloon_material_id: item.saloon_material_id,
          map_lat: item.map_lat,
          map_long: item.map_long,
          zoom: item.zoom,
          predicted_price: item.predicted_price,
          hdd: item.hdd,
          map_title: item.map_title,
          has_catalyst: item.has_catalyst,
          tmp: item.tmp,
          views: item.views,
          dealerId: item.dealerId,
          has_logo: item.has_logo,
          logo_ver: item.logo_ver,
          active_ads: item.active_ads,
          dealer_title: item.dealer_title,
          has_predicted_price: item.has_predicted_price,
          pred_first_breakpoint: item.pred_first_breakpoint,
          pred_second_breakpoint: item.pred_second_breakpoint,
          pred_min_price: item.pred_min_price,
          pred_max_price: item.pred_max_price,
          comfort_features: item.comfort_features,
        };
      });
    });
};








// export interface ManufacturerModel {
//   model_id: number;
//   man_id: number;
//   model_name: string;
//   // Add any other properties specific to the model
// }

// export const fetchManufacturerModels = (manufacturerId: number): Promise<ManufacturerModel[]> => {
//   const modelsEndpoint = `https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`;

//   return fetch(modelsEndpoint)
//     .then((response) => response.json())
//     .then((data) => {
//       return data.data.map((model: ManufacturerModel) => {
//         return {
//           model_id: model.model_id,
//           man_id: model.man_id,
//           model_name: model.model_name,
//           // Add any other properties specific to the model
//         };
//       });
//     });
// };

  
