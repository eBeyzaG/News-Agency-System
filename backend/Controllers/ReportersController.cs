using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using NewsWebsite.Models;

namespace NewsWebsite.Controllers
{
    public class ReportersController : Controller
    {
        private readonly NewsSiteDBContext _context;

        public ReportersController(NewsSiteDBContext context)
        {
            _context = context;
        }



        public async Task<IActionResult> FindAgencyNameByFullName(string firstname, string lastname) {

            
            var reporters = await _context.Reporters.Include(x => x.Agency).ToListAsync();
            ViewData["Agency"] = reporters.FirstOrDefault(x => x.Name == firstname && x.Surname == lastname).Agency.Name;
            ViewData["fullname"] = firstname +  " " + lastname;
            return View();
        } 




        // GET: Reporters
        public async Task<IActionResult> Index()
        {
            var newsSiteDBContext = _context.Reporters.Include(r => r.Agency);
            return View(await newsSiteDBContext.ToListAsync());
        }

        // GET: Reporters/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reporter = await _context.Reporters
                .Include(r => r.Agency)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reporter == null)
            {
                return NotFound();
            }

            return View(reporter);
        }

        // GET: Reporters/Create
        public IActionResult Create()
        {
            ViewData["AgencyId"] = new SelectList(_context.Agencies, "Id", "Id");
            return View();
        }

        // POST: Reporters/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Surname,AgencyId")] Reporter reporter)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reporter);
                await _context.SaveChangesAsync();

                TempData["result"] = "Create Successful";
                return RedirectToAction(nameof(Index));
            }
            else
            {
                TempData["result"] = "Create Failed";
            }
            ViewData["AgencyId"] = new SelectList(_context.Agencies, "Id", "Id", reporter.AgencyId);
            return View(reporter);
        }

        // GET: Reporters/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var reporter = await _context.Reporters.FindAsync(id);
            if (reporter == null)
            {
                return NotFound();
            }
            ViewData["AgencyId"] = new SelectList(_context.Agencies, "Id", "Id", reporter.AgencyId);
            return View(reporter);
        }

        // POST: Reporters/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Surname,AgencyId")] Reporter reporter)
        {
            if (id != reporter.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reporter);
                    await _context.SaveChangesAsync();
                    TempData["result"] = "Edit successful";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReporterExists(reporter.Id))
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

            ViewData["AgencyId"] = new SelectList(_context.Agencies, "Id", "Id", reporter.AgencyId);
            return View(reporter);
        }

        // GET: Reporters/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                TempData["result"] = "Delete Failed";
                return NotFound();
            }

            var reporter = await _context.Reporters
                .Include(r => r.Agency)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reporter == null)
            {
                TempData["result"] = "Delete Failed";
                return NotFound();
            }

            return View(reporter);
        }

        // POST: Reporters/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var reporter = await _context.Reporters.FindAsync(id);
            _context.Reporters.Remove(reporter);
            await _context.SaveChangesAsync();
            TempData["result"] = "Delete successful";
            return RedirectToAction(nameof(Index));
        }

        private bool ReporterExists(int id)
        {
            return _context.Reporters.Any(e => e.Id == id);
        }
    }
}
