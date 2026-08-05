import express from "express";
import { executeQuery } from "../utils/helper.js";

export class authModel {
  async requestOtp({ email, phn_num, c_code, otp, expiredTime }) {
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

  async fetchOtp({ email, phn_num, c_code }) {
    let query;
    let params;

    if (email) {
      query = `SELECT id, email, otp, is_used, is_verified, expired_at FROM otp WHERE email = ? ORDER BY created_at DESC LIMIT 1`;
      params = [email];
    } else if (phn_num) {
      query = `SELECT id, phn_num, c_code, otp, is_used, is_verified, expired_at FROM otp WHERE phn_num = ? ORDER BY created_at DESC LIMIT 1`;
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

  async verifyOtp(id) {
    let query = `UPDATE otp SET is_used = ?, is_verified = ? WHERE id = ?`;
    let params = [1, 1, id];
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

  async userExist({ email }) {
    let query;
    let params;
    if (email) {
      query = `SELECT id, user_id, email, password FROM users WHERE email = ?`;
      params = [email];
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

  async signUp({ user_id, email, hashed_pwd }, connection = null) {
    let query;
    let params;

    query = `INSERT INTO users (user_id, email, password, is_email_verified, form_status) VALUES (?, ?, ?, ?, ?)`;
    params = [user_id, email, hashed_pwd, 1, 0];

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

  async registerRole({ user_id, role }, connection = null) {
    let query;
    let params;

    query = `INSERT INTO user_role (user_id, user_role) VALUES (?, ?)`;
    params = [user_id, role];

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

  async signupCheck({ email }) {
    let query;
    let params;

    query = `SELECT ur.user_role FROM user_role ur JOIN users u ON ur.user_id = u.user_id WHERE email = ? `;
    params = [email];
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

  async loginCheck({ email }) {
    let query;
    let params;

    query = `SELECT u.user_id, u.email, u.password, ur.user_role FROM users u JOIN user_role ur ON u.user_id = ur.user_id WHERE email = ?`;
    params = [email];
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

  async is_email_num_verified({ email, phn_num, c_code }) {
    let query;
    let params;

    if (email) {
      query = `SELECT id, email, otp, is_used, is_verified, expired_at FROM otp WHERE email = ? AND is_used = ? AND expired_at > NOW() ORDER BY created_at DESC LIMIT 1`;
      params = [email, 1];
    } else if (phn_num) {
      query = `SELECT id, phn_num, c_code, otp, is_used, is_verified, expired_at FROM otp WHERE phn_num = ? AND is_used = ? AND expired_at > NOW() ORDER BY created_at DESC LIMIT 1`;
      params = [phn_num, 1];
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

  async is_user_id_valid({ email, user_id }) {
    let query;
    let params;

    query = `SELECT user_id, email FROM users WHERE email = ? AND user_id = ?`;
    params = [email, user_id];
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

  async is_user_exist({ user_id }) {
    let query;
    let params;

    query = `SELECT user_id, email FROM users WHERE user_id = ?`;
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
}
