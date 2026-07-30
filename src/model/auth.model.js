import express from "express";
import { executeQuery } from "../utils/helper.js";

export class authModel {
  async requestotp({ email, phn_num, c_code, otp, expiredTime }) {
    let query;
    let params;
    if (email) {
      query = `INSERT INTO otp (email, otp, expired_at) VALUES (?, ?, ?)`;
      params = [email, otp, expiredTime];
    } else if (phn_num) {
      query = `INSERT INTO otp (phn_num, c_code, otp, expired_at) VALUES (?, ?, ?, ?)`;
      params = [phn_num, c_code, otp, expiredTime];
    }

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

  async fetchotp({ email, phn_num, c_code }) {
    let query;
    let params;

    if (email) {
      query = `SELECT id, email, otp, is_used, expired_at FROM otp WHERE email = ? ORDER BY created_at DESC LIMIT 1`;
      params = [email];
    } else if (phn_num) {
      query = `SELECT id, phn_num, c_code, otp, is_used, expired_at FROM otp WHERE phn_num = ? ORDER BY created_at DESC LIMIT 1`;
      params = [phn_num];
    }
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

  async verifyotp(id) {
    let query = `UPDATE otp SET is_used = ? WHERE id = ?`;
    let params = [1, id];
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

  async fetchUserCount(email, phn_num) {
    let query;
    let params;
    if (email) {
      query = `SELECT id, user_id FROM users WHERE email = ?`;
      params = [email];
    } else if (phn_num) {
      query = `SELECT id, user_id FROM users WHERE phn_num = ?`;
      params = [phn_num];
    }

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
