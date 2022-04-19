using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NewsWebsite.Models;

namespace NewsWebsite.Controllers
{
    public class AgenciesController : Controller
    {
        private readonly NewsSiteDBContext _context;

        public AgenciesController(NewsSiteDBContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> getEstYearWithId(int? id) {

            if (id != null)
            {
                var agencyId = new SqlParameter
                {
                    ParameterName = "ag_id",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Value = id
                };

                var estYear = new SqlParameter
                {
                    ParameterName = "establishmentYear",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Size = 10,
                    Direction = System.Data.ParameterDirection.Output
                };

                await _context.Database.ExecuteSqlRawAsync(
                    "EXEC [dbo].[getEstYear] @ag_id, @establishmentYear=@establishmentYear OUTPUT", agencyId, estYear
                    );

                if (estYear.Value.Equals(DBNull.Value))
                {
                    ViewData["estYear"] = "No agency with given ID.";
                   
                }
                else {
                   // System.DBNull
                    var a = (int)estYear.Value;
                    ViewData["estYear"] = a.ToString();

                }
            }
            return View();
        }


        // GET: Agencies
        public async Task<IActionResult> Index()
        {
            return View(await _context.Agencies.ToListAsync());
        }

        // GET: Agencies/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agency = await _context.Agencies
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agency == null)
            {
                return NotFound();
            }

            return View(agency);
        }

        // GET: Agencies/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Agencies/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,EstablishmentYear")] Agency agency)
        {
            if (ModelState.IsValid)
            {
                _context.Add(agency);
                await _context.SaveChangesAsync();

                TempData["result"] = "Create Successful";
                return RedirectToAction(nameof(Index));
            }
            else
            {
                TempData["result"] = "Create Failed";
            }
            return View(agency);
        }

        // GET: Agencies/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var agency = await _context.Agencies.FindAsync(id);
            if (agency == null)
            {
                return NotFound();
            }
            return View(agency);
        }

        // POST: Agencies/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,EstablishmentYear")] Agency agency)
        {
            if (id != agency.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(agency);
                    await _context.SaveChangesAsync();
                    TempData["result"] = "Edit successful";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AgencyExists(agency.Id))
                    {
                        TempData["result"] = "Edit Failed - Record Not Found";
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            else
            {
                TempData["result"] = "Edit Failed";

            }

            return View(agency);
        }

        // GET: Agencies/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                TempData["result"] = "Delete Failed";
                return NotFound();
            }

            var agency = await _context.Agencies
                .FirstOrDefaultAsync(m => m.Id == id);
            if (agency == null)
            {
                TempData["result"] = "Delete Failed";
                return NotFound();
            }

            return View(agency);
        }

        // POST: Agencies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var agency = await _context.Agencies.FindAsync(id);
            _context.Agencies.Remove(agency);
            await _context.SaveChangesAsync();
            TempData["result"] = "Delete successful";
            return RedirectToAction(nameof(Index));
        }

        private bool AgencyExists(int id)
        {
            return _context.Agencies.Any(e => e.Id == id);
        }
    }
}
