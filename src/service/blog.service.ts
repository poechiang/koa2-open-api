import ArticleModel from "@M/article.model";

export default class BlogService {
  getArticleById = async (id: string) =>
    new Promise((resolve, reject) => {
      ArticleModel.findById(id).then(resolve);
    });

  getArticles = async (query: any) =>
    new Promise((resolve, reject) => {
      ArticleModel.find(
        query,
        [], // Columns to Return
        {
          skip: 0, // Starting Row
          limit: 10, // Ending Row
          sort: {
            modifyAt: -1, //Sort by Date Added DESC
            createdAt: -1,
          },
        }
      ).then((list) => {
        resolve(list);
      });
    });

  postArticle = (data: any) => {
    if (!data.createdAt) {
      data.createdAt = new Date();
    }
    return new Promise((resolve, reject) => {
      const newArticle = new ArticleModel(data);
      newArticle
        .save()
        .then((article) => {
          resolve(article);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  updateArticle = (data: any) => {
    return new Promise((resolve, reject) => {
      const { _id, ...art } = data;
      art.modifyAt = new Date();
      ArticleModel.updateOne({ _id }, art)
        .then((rlt) => {
          resolve(rlt);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  deleteArticle = (id: string) => {
    return new Promise((resolve, reject) => {
      ArticleModel.deleteOne({ _id: id }).then((args) => {
        resolve(args);
      });
    });
  };
  getTagsStatistics = () => {
    return new Promise((resolve, reject) => {
      ArticleModel.find({ draft: false }).then((list: any[]) => {
        resolve(
          (list || []).reduce((info, { tags }) => {
            tags.forEach((tag: string) => {
              info[tag] = (info[tag] || 0) + 1;
            });
            return info;
          }, {})
        );
      });
    });
  };
  getCatagories = () => {
    return new Promise((resolve, reject) => {
      ArticleModel.find({ draft: false }).then((list: any[]) => {
        resolve(
          Array.from(new Set((list || []).map(({ catagory }) => catagory)))
        );
      });
    });
  };
}
