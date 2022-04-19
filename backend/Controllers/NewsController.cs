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
    public class NewsController : Controller
    {
        private readonly NewsSiteDBContext _context;

        public NewsController(NewsSiteDBContext context)
        {
            _context = context;
        }


        public async Task<IActionResult> CountNewsPerDate(string? date) {

            if (date != null) {
                //var news = await _context.News.Select(x => x.Date).Where(x=> x.Equals(date)).ToListAsync();

                var news = await _context.News.Where(x => x.Date == date).Select(x => x).ToListAsync();
                ViewBag.dateNews = news;
            }

            return View();

        }


        public async Task<IActionResult> SearchNewsByKeyword(string? keyword) {

            var news = await _context.News.ToListAsync();

            var foundNews = new List<News>();

            if (keyword != null) {
                foreach (var n in news)
                {
                    if (n.Content.Contains(keyword))
                    {
                        foundNews.Add(n);
                    }
                }
            }
            
            ViewBag.FoundNews = foundNews;
            return View(foundNews);
        }


        public async Task<string> FindContent(string title) {
            var newsList = await  _context.News.ToListAsync();

            foreach (var n in newsList) {
                if (n.Title.Equals(title)) {
                    return n.Content;
                }
            }
            return "No news with given title.";
        }
        public async Task<IActionResult> FindContentByTitle(string? title) {

            if (title != null)
            {
                ViewData["content"] = await FindContent(title);
                
            }
            
            var newsSiteDBContext = _context.News.Include(n => n.Category).Include(n => n.Reporter);
            return View(await newsSiteDBContext.ToListAsync());
        }

        // GET: News
        public async Task<IActionResult> Index()
        {
            var newsSiteDBContext = _context.News.Include(n => n.Category).Include(n => n.Reporter);
            return View(await newsSiteDBContext.ToListAsync());
        }

        // GET: News/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var news = await _context.News
                .Include(n => n.Category)
                .Include(n => n.Reporter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (news == null)
            {
                return NotFound();
            }

            return View(news);
        }

        // GET: News/Create
        public IActionResult Create()
        {
            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id");
            ViewData["ReporterId"] = new SelectList(_context.Reporters, "Id", "Id");
            return View();
        }

        // POST: News/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Content,Date,ReporterId,CategoryId")] News news)
        {
            if (ModelState.IsValid)
            {
                _context.Add(news);
                await _context.SaveChangesAsync();
                TempData["result"] = "Create Successful";
                return RedirectToAction(nameof(Index));
            }
            else
            {
                TempData["result"] = "Create Failed";
            }

            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id", news.CategoryId);
            ViewData["ReporterId"] = new SelectList(_context.Reporters, "Id", "Id", news.ReporterId);
            return View(news);
        }

        // GET: News/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id", news.CategoryId);
            ViewData["ReporterId"] = new SelectList(_context.Reporters, "Id", "Id", news.ReporterId);
            return View(news);
        }

        // POST: News/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Content,Date,ReporterId,CategoryId")] News news)
        {
            if (id != news.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(news);
                    await _context.SaveChangesAsync();
                    TempData["result"] = "Edit successful";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NewsExists(news.Id))
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


            ViewData["CategoryId"] = new SelectList(_context.Categories, "Id", "Id", news.CategoryId);
            ViewData["ReporterId"] = new SelectList(_context.Reporters, "Id", "Id", news.ReporterId);
            return View(news);
        }

        // GET: News/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {

                TempData["result"] = "Delete Failed";
                return NotFound();

            }

            var news = await _context.News
                .Include(n => n.Category)
                .Include(n => n.Reporter)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (news == null)
            {

                TempData["result"] = "Delete Failed";
                return NotFound();
            }

            return View(news);
        }

        // POST: News/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var news = await _context.News.FindAsync(id);
            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            TempData["result"] = "Delete Sucessful";
            return RedirectToAction(nameof(Index));
        }

        private bool NewsExists(int id)
        {
            return _context.News.Any(e => e.Id == id);
        }
    }
}
