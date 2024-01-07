using System;
using System.Collections.Generic;
using System.Linq;
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

        // GET: api/account/all
        [HttpGet("all"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IEnumerable<AccountDTO>> GetAllAccount()
        {
            var accounts = await _context.Accounts.ToListAsync();
            return _mapper.Map<List<AccountDTO>>(accounts);
        }

        // PUT: api/account/unit-modify
        [HttpPut("unit-modify"), AuthorizeRoles(GlobalConstant.HeadQuater)]
        public async Task<IActionResult> ModAccount(AccountDTO accountDto)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(acc => acc.Id == accountDto.Id);

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
            account.Role = accountDto.Role;
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
            }); ;
        }
    }
}
