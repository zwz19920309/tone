const mysql = require('mysql2/promise')
require('./env')
const DataDb = mysql.createPool({
  host: process.env['SIGN_IP'],
  user: process.env['SIGN_USER'],
  password: process.env['SIGN_PASS'],
  database: process.env['SIGN_DATABASE'],
  dateStrings: true
})
class DBHelper {
  static async getCheckInTypeList() {
    let [rows] = await DataDb.query('SELECT id, type, name FROM checkin_type')
    return rows
  }
  static async findOneCheckInType(id) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM checkin_type WHERE id = ?', [id])
    return rows
  }

  static async getDateTypeList() {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type')
    return rows
  }

  static async getDateTypeById(params) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type where id = ?', [params.id])
    let res = rows.length ? rows[0] : {}
    return res
  }

  static async getDateTypeByType(params) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type where type = ? limit 1', [params.type])
    return rows
  }

  static async getDateTypeListByTypes(typeIds) {
    let sql = 'SELECT id, type, name FROM date_type where type in (?)'
    let [rows] = await DataDb.query(sql, [typeIds])
    return rows
  }

  static async findOneDateType(id) {
    let [rows] = await DataDb.query('SELECT id, type, name FROM date_type WHERE id = ? limit 1', [id])
    return rows
  }
  static async saveDateType(type, name) {
    let [rows] = await DataDb.query('insert into date_type SET ?', [{ type, name }])
    return rows
  }

  static async deleteDateType(params) {
    let [rows] = await DataDb.query('delete from datetype where id = ?', [params.id])
    return rows
  }

  static async getSceneList(params) {
    let [rows] = await DataDb.query('SELECT id, name, note, created_at FROM scene limit ?, ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(*) as total FROM scene')
    return { total: total[0][0].total, rows: rows }
  }

  static async findOneScene(id) {
    let [rows] = await DataDb.query('SELECT id, name, note FROM scene WHERE id = ? limit 1', [id])
    let res = rows.length ? rows[0] : {}
    return res
  }

  static async saveScene(params) {
    let [rows] = await DataDb.query('INSERT INTO SCENE SET ?', [{ name: params.name, note: params.note }])
    return rows
  }

  static async updateScene(params) {
    let [rows] = await DataDb.query('update scene SET ?  WHERE id = ?', [{ name: params.name, note: params.note }, params.id])
    return rows
  }

  static async bulkDeleteScene(params) {
    let [rows] = await DataDb.query('DELETE FROM SCENE WHERE id in (?)', [params.ids])
    return rows
  }

  static async getSignonList(params) {
    let [rows] = await DataDb.query('SELECT a.id as id, a.name as name, cycle_text, extra_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc,  checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id  limit ?, ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(*) as total FROM signon')
    return { total: total[0][0].total, rows: rows }
  }

  static async getSignonListInId(params) {
    // let sql = 'SELECT a.id as id, a.name as name, cycle_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc,  checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id  where a.id in (select distinct signon_id from scene_sign where scene_id = ?)'
    let sql = 'SELECT a.start_at start_at, a.end_at as end_at, b.id as id, b.name as name, rule_desc, cycle_text, prizes_text, checkintype_id, c.name as checktypename from scene_sign a LEFT JOIN signon b  on b.id = a.signon_id  LEFT JOIN checkin_type c on b.checkintype_id = c.id WHERE scene_id = ?'
    let [rows] = await DataDb.query(sql, params.sceneId)
    return { total: rows.length, rows: rows }
  }

  static async getSignonListNotInId(params) {
    let sql = 'SELECT a.id as id, a.name as name, cycle_text, prizes_text, b.name as checktypename, b.type as checktypetype, rule_desc,  checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id  where a.id not in (select distinct  signon_id from scene_sign where scene_id = ?)'
    let [rows] = await DataDb.query(sql, params.sceneId)
    return { total: rows.length, rows: rows }
  }

  static async addSignon(params) {
    let [rows] = await DataDb.query('insert into signon SET ?', [{ name: params.name, rule_desc: params.rule_desc, checkintype_id: params.checkintype_id, cycle_text: params.cycle_text, extra_text: params.extra_text }])
    return rows
  }

  static async updateSignonPrizes(params, cons) {
    let [rows] = await DataDb.query('UPDATE signon SET prizes_text = ? where id = ?', [params.prizes_text, cons.id])
    return rows
  }

  static async updateSignonConsumes(params, cons) {
    let [rows] = await DataDb.query('UPDATE signon SET extra_text = ? where id = ?', [params.extraText, cons.id])
    return rows
  }

  static async updateSignonInfo(params, cons) {
    let [rows] = await DataDb.query('UPDATE signon SET  ? where id = ?', [{ name: params.name, checkintype_id: params.checkintype_id, rule_desc: params.rule_desc, cycle_text: params.cycle_text }, cons.id])
    return rows
  }

  static async deleteSignon(params) {
    let sql = 'delete FROM signon where id in (?)'
    let [rows] = await DataDb.query(sql, [params.ids])
    return rows
  }

  static async getSignonById(params) {
    let [rows] = await DataDb.query('SELECT a.id as id, a.name as name, cycle_text, prizes_text, extra_text, b.name as checktypename, b.type as checktypetype, rule_desc, checkintype_id  FROM signon a left join checkin_type b on a.checkintype_id = b.id where a.id = ? limit 1', [params.id])
    return rows[0]
  }

  static async getPrizeList(params) {
    let [rows] = await DataDb.query('SELECT id, name, note, icon from prize  limit ?, ?', [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(1) as total FROM prize')
    return { total: total[0][0].total, rows: rows }
  }

  static async getPrizeListNotInId(prizesId) {
    let sql = 'select id, name, note FROM prize where id not in (?)'
    let [rows] = await DataDb.query(sql, [prizesId])
    return { rows: rows }
  }

  static async getPrizeListInId(prizesId) {
    let sql = 'select id, name, note, icon FROM prize where id in (?)'
    let [rows] = await DataDb.query(sql, [prizesId])
    return { rows: rows }
  }

  static async savePrize(params) {
    let [rows] = await DataDb.query('insert into prize  SET ?', [{ name: params.name, note: params.note, icon: params.icon }])
    return rows
  }

  static async bulckDetelePrize(params) {
    let [rows] = await DataDb.query('delete from prize WHERE id in (?)', [params.ids])
    //  await DataDb.query('DELETE FROM scene_sign WHERE signon_id in (?) and scene_id = ?', [params.signonIds, params.sceneId])
    return rows
  }

  static async updatePrize(params, cons) {
    let [rows] = await DataDb.query('update prize SET ? where id = ?', [{ name: params.name, note: params.note, icon: params.icon }, cons.id])
    return rows
  }

  static async getPrizeById(params) {
    let [rows] = await DataDb.query('SELECT name, note FROM prize where id = ?', [params.id])
    return rows
  }

  static async bulkSaveSceneSign(params) {
    let [rows] = await DataDb.query('INSERT INTO scene_sign (scene_id, signon_id, start_at, end_at) VALUES ?', [params])
    return rows
  }

  static async bulkDekleteSceneSign(params) {
    let [rows] = await DataDb.query('DELETE FROM scene_sign WHERE signon_id in (?) and scene_id = ?', [params.signonIds, params.sceneId])
    return rows
  }

  static async getResignFormList() {
    let [rows] = await DataDb.query('SELECT id, type, name FROM resign_form')
    return rows
  }

  static async getResignDateList() {
    let [rows] = await DataDb.query('SELECT re_date FROM resign_date')
    return rows
  }

  static async addResignDate(params) {
    let [rows] = await DataDb.query('UPDATE settings SET resign =  ? WHERE id = 1', [params.resign])
    return rows
  }
  // 'UPDATE signon SET extra_text = ? where id = ?

  static async getResignSettings(params) {
    let [rows] = await DataDb.query('SELECT resign FROM settings where id = ?', [params.id])
    let res = rows.length ? rows[0].resign : []
    return res
  }

  static async bulkSaveAwardRecord(params) {
    let [rows] = await DataDb.query('INSERT INTO award_record (uid, prize_id, scenesign_id, created_at) VALUES ?', [params])
    return rows
  }

  static async getAwardRecordList(params) {
    let sql = 'SELECT a.id as record_id, a.uid as uid, a.created_at as created_at, b.name as prize_name, b.note as prize_note, c.id as scenesign_id from award_record a ' +
      'LEFT JOIN prize b on a.prize_id = b.id LEFT JOIN scene_sign c on c.id = a.scenesign_id'
    let [rows] = await DataDb.query((sql + ' limit ?, ?'), [(params.page - 1) * params.pageSize, params.pageSize])
    let total = await DataDb.query('SELECT count(1) as total from award_record')
    return { total: total[0][0].total, rows: rows }
  }

  static async bulkSaveSignRcord(params) {
    let [rows] = await DataDb.query('INSERT INTO sign_record (uid, scene_id, created_at) VALUES ?', [params])
    return rows
  }

  static async getUserSignRcord(params) {
    let [rows] = await DataDb.query('SELECT * FROM sign_record WHERE uid  = ? and scene_id = ? and created_at = ? limit 1', [params.uid, params.scene_id, params.created_at])
    let res = rows.length ? rows[0] : null
    return res
  }

  static async getYearsTodayRcord(params) {
    let [rows] = await DataDb.query('SELECT * FROM sign_record WHERE uid =? and created_at = ?', [params.uid, params.created_at])
    let res = rows.length ? rows[0] : null
    return res
  }

  static async getSumUserSignRcord(params) {
    let [rows] = await DataDb.query('SELECT count(1) as number FROM sign_record WHERE uid  = ? and scene_id = ? and created_at BETWEEN ? and ? ', [params.uid, params.scene_id, params.start_at, params.end_at])
    let res = rows.length ? rows[0].number : 0
    return res
  }

  static async userSignonAward(params) {
    let con = await DataDb.getConnection()
    try {
      await con.beginTransaction()
      if (params.prizes && params.prizes.length) {
        await con.query('INSERT INTO award_record (uid, prize_id, scenesign_id, created_at) VALUES ?', [params.prizes])
      }
      await con.query('INSERT INTO sign_record SET ?', [params.record])
      await con.commit()
      await con.release()
      return true
    } catch (e) {
      await con.rollback()
      await con.release()
      throw e
    }
  }
}

module.exports = DBHelper
