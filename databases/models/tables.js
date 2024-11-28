const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize("codingtest", "root", "1234",config);
const db = {};


class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        id: {
          type: Sequelize.BIGINT(10),
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING
        },
        balance: {
          type: Sequelize.INTEGER
        }
      }, {
        sequelize, // sequelize 인스턴스를 옵션 객체 안에 배치
        timestamps: false
      });
    }
  }

class Stores extends Sequelize.Model{

    static init(sequelize){
        return super.init({
            id: {
                type:Sequelize.BIGINT(10),
                primaryKey: true,
                autoIncrement:true
            },

            sellername:{
              type:Sequelize.STRING
            },

            productname: {
                type:Sequelize.STRING
            },

            cost: {
                type:Sequelize.INTEGER
            },
            quantity:{
                type:Sequelize.INTEGER
            }
        },{
            sequelize,
            timestamps: false
        });
    }
        static associate(db){
            db.Stores.belongsTo(db.User,{foreignkey:"userId",targetKey:'id'})
        }
    }

module.exports = {User,Stores}

    db.User = User;
    db.Stores = Stores;
    
    User.init(sequelize);
    Stores.init(sequelize);
    
    Stores.associate(db);
    //--------------------

sequelize.sync()
  .then(() => {
    
  })
  .catch(err => {
    console.error('데이터베이스 연결 실패:', err);
  });


