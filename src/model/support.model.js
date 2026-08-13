import express from "express";
import { executeQuery } from "../utils/helper.js";

export class supportModel {
  async fetchPwd({ user_id }) {
    let query;
    let params;

    query = `SELECT email, password FROM users WHERE user_id = ?`;
    params = [user_id];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async updateUserEmail({ email, user_id }, connection = null) {
    let query;
    let params;

    query = `UPDATE users SET email = ? WHERE user_id = ?`;
    params = [email, user_id];

    const result = await executeQuery(query, params, connection);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async updateUserPhn_num({ phn_num, c_code, user_id }, connection = null) {
    let query;
    let params;

    query = `UPDATE users SET phn_num = ?, c_code = ? WHERE user_id = ?`;
    params = [phn_num, c_code, user_id];

    const result = await executeQuery(query, params, connection);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }

  // SEARCH QUERIES
  async addRecentSearch({ user_id, keyword, location }) {
    let query;
    let params;
    const search = keyword || location;
    const keyword_type = keyword ? 0 : 1;

    query = `INSERT INTO recent_searches (user_id, keyword, keyword_type) VALUES (?, ?, ?)`;
    params = [user_id, search, keyword_type];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async delete_recent_search({ user_id, keyword, location }) {
    let query;
    let params;
    const keyword_type = keyword ? 0 : 1;

    query = `DELETE FROM recent_searches
WHERE
  user_id = ?
  AND keyword_type = ?
  AND id NOT IN (
    SELECT
      id
    FROM
      (
        SELECT
          id
        FROM
          recent_searches
        WHERE
          user_id = ?
          AND keyword_type = ?
        ORDER BY
          created_at DESC
        LIMIT
          5
      ) AS latest
  );`;
    params = [user_id, keyword_type, user_id, keyword_type];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async getRecentSearches({ user_id, type }) {
    let query;
    let params;

    query = `SELECT id, keyword, keyword_type FROM recent_searches WHERE user_id = ? AND keyword_type = ? ORDER BY created_at DESC`;
    params = [user_id, type];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async deleteRecentSearches({ user_id, search_id }) {
    let query;
    let params;

    const placeholders = search_id.map(() => "?").join(", ");

    query = `DELETE FROM recent_searches WHERE user_id = ? AND id IN (${placeholders}) ORDER BY created_at DESC`;
    params = [user_id, ...search_id];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async addTrendingSearch({ user_id, keyword, location }) {
    let query;
    let params;
    const search = keyword || location;
    const keyword_type = keyword ? 0 : 1;

    query = `INSERT INTO trending_search (user_id, keyword, keyword_type) VALUES (?, ?, ?)`;
    params = [user_id, search, keyword_type];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
  async getTrendingSearches({ user_id, type }) {
    let query;
    let params;

    query = `SELECT keyword, COUNT(*) AS search_count
    FROM trending_search
    WHERE keyword_type = ?
    GROUP BY keyword
    ORDER BY search_count DESC
    LIMIT 5;`;
    params = [type];

    const result = await executeQuery(query, params);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
}
