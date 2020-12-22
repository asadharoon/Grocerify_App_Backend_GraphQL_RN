const { UserAuthCheck } = require("../../middleware/userAuth");
const cloudinary = require("../../utils/cloudinary");
const ProductModel = require("../../models/Product.model");
const StoreModel = require("../../models/Store.model");
const UserModel = require("../../models/User.model");

const Resolver = {
  Query: {
    getSingleProduct: async (_, args, { req, res }) => {
      console.log(args.id);
      let p = await ProductModel.findById(args.id);
      return p;
    },
    getProducts: async (_, args, { req, res }) => {
      let { StoreName, StoreAddress, ...rest } = args.product;
      if (StoreName != undefined || StoreAddress != undefined) {
        let store = await StoreModel.findOne({ StoreName, StoreAddress });
        if (store) {
          return await ProductModel.find({ StoreID: store.id });
        } else {
          throw new Error("No Product Found");
        }
      } else {
        let p = await ProductModel.find({ ...rest, Quantity: { $not: 0 } });
        return p;
      }
    },
    getProductByCategory: async (_, args, { req, res }) => {
      console.log("in get prod by categry");
      let s = 10;
      let pageNum = args.page;
      let start = pageNum * s;
      return await UserAuthCheck(req, res)
        .then(async () => {
          console.log("in getting product by cat");
          let p = await ProductModel.find({ Category: args.Category })
            .sort({ UpdatedAt: -1 })
            .skip(start)
            .limit(s);
          return p;
        })
        .catch((err) => {
          console.log("err is", err.message);
          throw new Error(err.message);
        });
    },
    getAllProducts: async (_, args, { req, res }) => {
      return await UserAuthCheck(req, res)
        .then(async () => {
          let s = 2;
          let pageNum = args.page;
          let start = pageNum * s;
          console.log("in finding");
          console.log(args);
          let p = await ProductModel.find({ Quantity: { $gt: 0 } })
            .sort({ UpdatedAt: -1 })
            .skip(start)
            .limit(s);
          console.log(p);
          return p;
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
  },
  Mutation: {
    addProduct: async (_, args, { req, res }) => {
      console.log("in addProd", args.product.file.substr(0, 100));
      // console.log(args);
      //   await cloudinary.uploader.destroy()
      await cloudinary.uploader
        .upload(args.product.file, {
          folder: "MAD/",
          use_filename: true,
          unique_filename: false,
        })
        .then(async (a) => {
          let p = new ProductModel({
            Name: "Abc",
            Price: 123,
            Image: a.url,
            id: "abc123",
            Discount: 0,
            Quantity: 0,
            Discontinued: false,
            cloudID: a.public_id,
            StoreID: "as1233444",
            Description: "Hello Asad",
          });
          await p.save().then((b) => {
            return b;
          });
          console.log(a.public_id, a.url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateProduct: async (_, args, { req, res }) => {
      let { ProdID, StoreID, ...rest } = args.product;
      let storeVerification = await ProductModel.findOne({
        _id: ProdID,
        StoreID: StoreID,
      });
      if (storeVerification.length != 0) {
        console.log("store verified");
        console.log(storeVerification.cloudID);
        await cloudinary.uploader.destroy(storeVerification.cloudID);
        return await cloudinary.uploader
          .upload(rest.Image)
          .then(async (image) => {
            let cloudID = image.public_id;
            let url = image.url;
            return await ProductModel.findByIdAndUpdate(ProdID, {
              ...rest,
              Image: url,
              cloudID: cloudID,
            }).then((value) => {
              return value;
            });
          });
      } else {
        throw new Error("Wrong Product or Store not Found");
      }
    },
    deleteProduct: async (_, args, { req, res }) => {
      let id = args.product.id;
      console.log("in delete product");
      return await ProductModel.findByIdAndDelete(id).then((value) => {
        console.log(value);
        if (value == null) {
          console.log("in err");
          throw new Error("Not Found");
        } else {
          console.log("in deleted");
          return "Deleted";
        }
      });
    },
    addToCart: async (_, args, { req, res }) => {
      let user = args.user;
      await UserModel.findByIdAndUpdate(user, {
        $set: {
          Cart: [args.Cart],
        },
      })
        .then(() => {
          return "Updated";
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    },
  },
};
module.exports = { Resolver };
