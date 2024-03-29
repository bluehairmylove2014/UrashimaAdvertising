﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrashimaServer.Common.Constant;
using UrashimaServer.Common.CustomAttribute;
using UrashimaServer.Database;
using UrashimaServer.Database.Dtos;
using UrashimaServer.Models;

namespace UrashimaServer.Controllers
{
    /// <summary>
    /// Controller quản lý tài khoản.
    /// </summary>
    [Route("api/account")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AccountsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// API lấy thông tin cơ bản của tài khoản.
        /// </summary>
        // GET: api/account/info
        [HttpGet("info"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<ActionResult<Account>> GetAccountBasicInfo()
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var account = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        /// <summary>
        /// API cập nhật thông tin cơ bản của tài khoản.
        /// </summary>
        // PUT: api/account/info
        [HttpPut("info"), AuthorizeRoles(GlobalConstant.WardOfficer, GlobalConstant.DistrictOfficer, GlobalConstant.HeadQuater)]
        public async Task<IActionResult> PutAccountBasicInfo(AccountBasicInfoDto accountDto)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Email == User.Identity!.Name);

            if (account is null)
            {
                return BadRequest(new
                {
                    Message = "Đã có lỗi xảy ra với tài khoản của bạn. Hãy đăng nhập lại!",
                });
            }

            _context.Entry(account).State = EntityState.Modified;

            account.Email = accountDto.Email;
            account.FullName = accountDto.FullName;
            account.DateOfBirth = accountDto.DateOfBirth;
            account.Phone = accountDto.Phone;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(new
            {
                message = "Cập nhật thông tin cá nhân thành công."
            }); ;
        }

        /// <summary>
        /// API Headquarter lấy danh sách tài khoản.
        /// </summary>
        // GET: api/account/all
        [HttpGet("all"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IEnumerable<AccountDTO>> GetAllAccount()
        {
            var accounts = await _context.Accounts.ToListAsync();
            return _mapper.Map<List<AccountDTO>>(accounts);
        }

        /// <summary>
        /// API Headquarter cập nhật đơn vị quản lý của tài khoản.
        /// </summary>
        // PUT: api/account/unit-modify
        [HttpPut("unit-modify"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ModAccount(UpdateUnitUnderManagementDto accountDto)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Id == accountDto.Id);

            if (account is null)
            {
                return BadRequest(new
                {
                    Message = $"Không tìm thấy tài khoản với id={accountDto.Id}",
                });
            }
            
            var checkListDistrict = _context.WardDistricts.Select(wd => wd.District).Distinct().ToList();
            var countDistrict = Regex.Matches(accountDto.UnitUnderManagement, $@"(?i)^({String.Join('|', checkListDistrict)})$").Count;
            
            var checkListWard = _context.WardDistricts.Select(wd => $"{wd.Ward}, {wd.District}").ToList();
            var countWard = Regex.Matches(accountDto.UnitUnderManagement, $@"(?i)^({String.Join('|', checkListWard)})$").Count;

            if (account.Role.Equals(GlobalConstant.DistrictOfficer))
            {
                if (countDistrict != 1)
                {
                    return BadRequest(new
                    {
                        message = "Cán bộ Quận chỉ được quản lý một Quận."
                    });
                }
            } 
            else if (account.Role.Equals(GlobalConstant.WardOfficer))
            {
                if (countWard != 1)
                {
                    return BadRequest(new
                    {
                        message = "Cán bộ Phường chỉ được quản lý một Phường."
                    });
                }
            }

            _context.Entry(account).State = EntityState.Modified;
            account.UnitUnderManagement = accountDto.UnitUnderManagement;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(new
            {
                message = "Cập nhật thông tin cá nhân thành công."
            });
        }
    }
}
